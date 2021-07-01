
import { Chainseeker } from '../index';
const cs = new Chainseeker();

const blockHash = '00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048';
const txid = '0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098';

test('get block from block hash', async () => {
	const block = await cs.getBlockWithTxs(blockHash);
	expect(block.txs[0].txid).toBe(txid);
});

test('get block from block height', async () => {
	const block = await cs.getBlockWithTxs(1);
	expect(block.txs[0].txid).toBe(txid);
});

