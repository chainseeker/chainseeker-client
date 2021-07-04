
import { Chainseeker } from '../index';
const cs = new Chainseeker('https://tbtc-v3.chainseeker.info/api');
import * as bitcoin from 'bitcoinjs-lib';

require('dotenv').config();

const PRIVKEY = process.env['CS_PRIVKEY']!;

test('put transaction', async () => {
	const keyPair = bitcoin.ECPair.fromWIF(PRIVKEY, bitcoin.networks.testnet);
	const { address } = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: bitcoin.networks.testnet });
	if(address === undefined) throw new Error('Failed to compute address.');
	const utxos = await cs.getUtxos(address);
	const psbt = new bitcoin.Psbt({ network: bitcoin.networks.testnet });
	let balance = 0;
	for(const utxo of utxos) {
		balance += utxo.value;
		psbt.addInput({
			hash: utxo.txid,
			index: utxo.vout,
			witnessUtxo: {
				script: Buffer.from(utxo.scriptPubKey.hex, 'hex'),
				value: utxo.value,
			},
		});
	}
	psbt.addOutput({
		address: address,
		value: balance - 300 * utxos.length,
	});
	for(let vin=0; vin<utxos.length; vin++) {
		psbt.signInput(vin, keyPair);
	}
	psbt.finalizeAllInputs();
	const tx = psbt.extractTransaction();
	const txResult = await cs.putTransaction(tx.toHex());
	expect(txResult.txid).toBe(tx.getId());
});

