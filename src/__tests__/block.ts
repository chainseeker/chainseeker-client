
import { Chainseeker } from '../index';
const cs = new Chainseeker();

const blockHash = '00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048';

test('get block from block hash', async () => {
	const block = await cs.getBlock(blockHash);
	expect(block.hash).toBe(blockHash);
});

test('get block from block height', async () => {
	const block = await cs.getBlock(1);
	expect(block.hash).toBe(blockHash);
});

