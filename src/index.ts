
import fetch from 'node-fetch';
import { request as graphqlRequest } from 'graphql-request';

import * as types from './types';

export const DEFAULT_API_ENDPOINT = 'https://btc.chainseeker.info/api';

export class Chainseeker {
	constructor(private endpoint = DEFAULT_API_ENDPOINT) {
	}
	private async getRestV1<T>(path: string[]): Promise<T> {
		const res = await fetch(`${this.endpoint}/v1/${path.join('/')}`);
		if(!res.ok) throw new Error('Failed to call API: ' + res.statusText);
		const json = await res.json();
		if(json.error) throw new Error('API server responded as an error: ' + json.error.toString());
		return json;
	}
	getStatus(): Promise<types.Status> {
		return this.getRestV1<types.Status>(['status']);
	}
	getBlock(tag: string|number): Promise<types.Block> {
		return this.getRestV1<types.Block>(['block', (typeof tag == 'number' ? tag.toString() : tag)]);
	}
	getTransaction(txid: string): Promise<types.Transaction> {
		return this.getRestV1<types.Transaction>(['tx', txid]);
	}
	getTxids(address: string): Promise<string[]> {
		return this.getRestV1<string[]>(['txids', address]);
	}
	getUtxos(address: string): Promise<types.Utxo[]> {
		return this.getRestV1<types.Utxo[]>(['utxos', address]);
	}
	async putTransaction(rawtx: string): Promise<types.Transaction> {
		const res = await fetch(`${this.endpoint}/v1/tx/broadcast`, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'text/plain',
			},
			body: rawtx,
		});
		if(!res.ok) throw new Error('Failed to call API: ' + res.statusText);
		const json = await res.json();
		if(json.error) throw new Error('API server responded as an error: ' + json.error.toString());
		return json;
	}
	getGraphQL<T>(query: string, variables: object={}): Promise<T> {
		return graphqlRequest(`${this.endpoint}/graphql`, query, variables);
	}
	async getBlocks(refs: (string|number)[]): Promise<types.Block[]> {
		if(refs.length == 0) return [];
		let query: string[] = [];
		query = query.concat([
			'fragment block on Block {',
				'header',
				'hash',
				'version',
				'previousblockhash',
				'merkleroot',
				'time',
				'bits',
				'difficulty',
				'nonce',
				'size',
				'strippedsize',
				'weight',
				'height',
				'txids',
			'}',
		]);
		query.push('query Block {');
		for(let i in refs) {
			query = query.concat([
				`block_${i}: block(id: "${refs[i]}") {`,
					'...block',
				'}',
			]);
		}
		query.push('}');
		const blocks = Object.values(await this.getGraphQL<object>(query.join('\n')));
		for(let i in blocks) {
			blocks[i].nonce = Number.parseInt(blocks[i].nonce);
		}
		return blocks;
	}
	async getTransactions(txids: string[]): Promise<types.Transaction[]> {
		if(txids.length == 0) return [];
		let query: string[] = [];
		query = query.concat([
			'fragment tx on Transaction {',
				'hex',
				'txid',
				'hash',
				'size',
				'vsize',
				'version',
				'locktime',
				'confirmed_height',
				'vin {',
					'txid',
					'vout',
					'scriptSig {',
						'asm',
						'hex',
					'}',
					'txinwitness',
					'sequence',
					'value',
					'address',
				'}',
				'vout {',
					'value',
					'n',
					'scriptPubKey {',
						'asm',
						'hex',
						'type',
						'address',
					'}',
				'}',
				'fee',
			'}',
		]);
		query.push('query Transaction {');
		for(let i in txids) {
			query = query.concat([
				`tx_${i}: tx(id: "${txids[i]}") {`,
					'...tx',
				'}',
			]);
		}
		query.push('}');
		const txs = Object.values(await this.getGraphQL<object>(query.join('\n')));
		for(let i in txs) {
			txs[i].fee = Number.parseInt(txs[i].fee);
			for(let j in txs[i].vin) {
				txs[i].vin[j].vout = Number.parseInt(txs[i].vin[j].vout);
				txs[i].vin[j].sequence = Number.parseInt(txs[i].vin[j].sequence);
				txs[i].vin[j].value = Number.parseInt(txs[i].vin[j].value);
			}
			for(let j in txs[i].vout) {
				txs[i].vout[j].value = Number.parseInt(txs[i].vout[j].value);
			}
		}
		return txs;
	}
	async getBlockSummary(offset: number, limit: number, items: string[]): Promise<types.BlockSummary> {
		let query: string[] = [
			'query BlockSummary {',
			 `blockSummary(offset: ${offset}, limit: ${limit}) {`,
		];
		query = query.concat(items);
		query.push('}');
		query.push('}');
		const data = (await this.getGraphQL<{ blockSummary: {
			hash: string,
			time: number,
			nonce: string,
			size: number,
			strippedsize: number,
			weight: number,
			txcount: number
		}[] }>(query.join('\n'))).blockSummary;
		return data.map((d) => ({
			hash: d.hash,
			time: d.time,
			nonce: d.nonce ? Number.parseInt(d.nonce) : undefined,
			size: d.size,
			strippedsize: d.strippedsize,
			weight: d.weight,
			txcount: d.txcount,
		}));
	}
	async getAddressBalances(offset: number, limit: number): Promise<types.AddressBalance> {
		let query: string[] = [
			'query AddressBalances {',
				`addressBalances(offset: ${offset}, limit: ${limit}) {`,
					'count',
					'data {',
						'scriptPubKey',
						'address',
						'value',
					'}',
				'}',
			'}'
		];
		const data = (await this.getGraphQL<{ addressBalances: { count: number, data: { scriptPubKey: string, address: string|null, value: string }[] } }>(query.join('\n'))).addressBalances;
		return {
			count: data.count,
			data: data.data.map((d) => ({
				scriptPubKey: d.scriptPubKey,
				address: d.address,
				value: Number.parseInt(d.value),
			})),
		};
	}
}


