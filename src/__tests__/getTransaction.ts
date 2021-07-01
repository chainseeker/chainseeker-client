
import { Chainseeker } from '../index';
const cs = new Chainseeker();

const txid = '0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098';

test('get transaction', async () => {
	const tx = await cs.getTransaction(txid);
	expect(tx.txid).toBe(txid);
});

