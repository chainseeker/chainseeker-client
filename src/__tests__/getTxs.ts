
import { Chainseeker } from '../index';
const cs = new Chainseeker();

const address = '1CounterpartyXXXXXXXXXXXXXXXUWLpVr';

test('get related transactions for an address', async () => {
	const utxos = await cs.getTxs(address);
	expect(utxos.length).toBeGreaterThan(0);
});

