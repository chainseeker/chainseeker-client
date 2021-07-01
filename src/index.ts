
import * as types from './types';

export const DEFAULT_API_ENDPOINT = 'https://btc.chainseeker.info/api';

const fetch_ = () => {
	return (typeof fetch !== 'undefined' ? fetch : require('node-fetch'));
};

export class Chainseeker {
	constructor(private endpoint = DEFAULT_API_ENDPOINT) {
	}
	private async getRestV1<T>(path: string[]): Promise<T> {
		const res = await fetch_()(`${this.endpoint}/v1/${path.join('/')}`);
		if(!res.ok) throw new Error('Failed to call API: ' + res.statusText);
		const json = await res.json();
		if(json.error) throw new Error('API server responded as an error: ' + json.error.toString());
		return json;
	}
	getStatus(): Promise<types.Status> {
		return this.getRestV1<types.Status>(['status']);
	}
	getBlockHeader(tag: string|number): Promise<types.BlockHeader> {
		return this.getRestV1<types.BlockHeader>(['block', (typeof tag == 'number' ? tag.toString() : tag)]);
	}
	getBlockWithTxids(tag: string|number): Promise<types.BlockWithTxids> {
		return this.getRestV1<types.BlockWithTxids>(['block_with_txids', (typeof tag == 'number' ? tag.toString() : tag)]);
	}
	getBlockWithTxs(tag: string|number): Promise<types.BlockWithTxs> {
		return this.getRestV1<types.BlockWithTxs>(['block_with_txs', (typeof tag == 'number' ? tag.toString() : tag)]);
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
		const res = await fetch_()(`${this.endpoint}/v1/tx/broadcast`, {
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
	getBlockSummary(offset: number, limit: number): Promise<types.BlockSummary> {
		return this.getRestV1<types.BlockSummary>(['block_summary', offset.toString(), limit.toString()]);
	}
	async getRichListCount(): Promise<number> {
		return (await this.getRestV1<{ count: number }>(['rich_list_count'])).count;
	}
	getRichList(offset: number, limit: number): Promise<types.RichList> {
		return this.getRestV1<types.RichList>(['rich_list', offset.toString(), limit.toString()]);
	}
}

