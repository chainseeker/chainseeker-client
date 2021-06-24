
import * as cs from '../src/index';

test('get address balances', async () => {
	const addressBalances = await cs.getAddressBalances(0, 10);
	expect(addressBalances.count).toBeGreaterThan(0);
});

