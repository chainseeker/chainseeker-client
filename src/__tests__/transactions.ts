
import { Chainseeker } from '../index';
const cs = new Chainseeker();

const txids = [
	"0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098",
	"9b0fc92260312ce44e74ef369f5c66bbb85848f2eddd5a7a1cde251e54ccfdd5",
	"999e1c837c76a1b7fbb7e57baf87b309960f5ffefbf2a9b95dd890602272f644",
	"df2b060fa2e5e9c8ed5eaf6a45c13753ec8c63282b2688322eba40cd98ea067a",
	"63522845d294ee9b0188ae5cac91bf389a0c3723f084ca1025e7d9cdfe481ce1",
	"20251a76e64e920e58291a30d4b212939aae976baca40e70818ceaa596fb9d37",
	"8aa673bc752f2851fd645d6a0a92917e967083007d9c1684f9423b100540673f",
	"a6f7f1c0dad0f2eb6b13c4f33de664b1b0e9f22efad5994a6d5b6086d85e85e3",
	"0437cd7f8525ceed2324359c2d0ba26006d92d856a9c20fa0241106ee5a597c9",
	"d3ad39fa52a89997ac7381c95eeffeaf40b66af7a57e9eba144be0a175a12b11",
];

test('get transaction', async () => {
	const txs = await cs.getTransactions(txids);
	expect(txs.length).toBe(10);
}, 60 * 1000);

