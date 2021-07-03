
import { Chainseeker } from '../index';
const cs = new Chainseeker();

const blockHash = '00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048';
const txids = ['0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098'];

test('get block from block hash', async () => {
	const block = await cs.getBlockWithTxids(blockHash);
	expect(block.txids).toEqual(txids);
});

test('get block from block height', async () => {
	const block = await cs.getBlockWithTxids(1);
	expect(block.txids).toEqual(txids);
});

