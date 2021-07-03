
import { Chainseeker } from '../index';
const cs = new Chainseeker();

test('get rich list count', async () => {
	const count = await cs.getRichListCount();
	expect(count).toBeGreaterThan(0);
});

test('get rich list', async () => {
	const richList = await cs.getRichList(0, 100);
	expect(richList.length).toBeGreaterThan(0);
});

test('get rich list rank', async () => {
	const rank = await cs.getRichListRank('34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo');
	expect(rank).toBeGreaterThan(0);
});

