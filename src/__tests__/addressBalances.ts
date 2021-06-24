
import { Chainseeker } from '../src/index';
const cs = new Chainseeker();

test('get address balances', async () => {
	const addressBalances = await cs.getAddressBalances(0, 10);
	expect(addressBalances.count).toBeGreaterThan(0);
});

