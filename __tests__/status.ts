
import * as cs from '../src/index';

test('status', async () => {
	const status = await cs.getStatus();
	expect(typeof status.blocks).toBe('number');
});

