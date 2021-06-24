
import * as cs from '../src/index';

const address = '1CounterpartyXXXXXXXXXXXXXXXUWLpVr';

test('get transactions for an address', async () => {
	const utxos = await cs.getUtxos(address);
	expect(utxos.length).toBeGreaterThan(0);
});

