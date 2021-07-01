
import { Chainseeker } from '../index';
const cs = new Chainseeker();

test('get block summary', async () => {
	const blockSummary = await cs.getBlockSummary(0, 10);
	expect(blockSummary.length).toBe(10);
});

