
import { Chainseeker } from '../index';
const cs = new Chainseeker();

const address = '1JqDybm2nWTENrHvMyafbSXXtTk5Uv5QAn';

test('get transactions for an address', async () => {
	const txids = await cs.getTxids(address);
	expect(txids.length).toBeGreaterThan(0);
}, 30 * 1000);

