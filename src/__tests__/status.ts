
import { Chainseeker } from '../index';
const cs = new Chainseeker();

test('status', async () => {
	const status = await cs.getStatus();
	expect(typeof status.blocks).toBe('number');
});

