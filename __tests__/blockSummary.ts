
import * as cs from '../src/index';

test('get block summary', async () => {
	const blockSummary = await cs.getBlockSummary(0, 10, ['hash']);
	expect(blockSummary.length).toBe(10);
});

