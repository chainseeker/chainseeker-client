
export type Status = {
	blocks: number;
};

export type CounterParty = {
	destination: string;
	message: string;
};

export type ScriptSig = {
	asm: string;
	hex: string;
};

export type Vin = {
	txid: string;
	vout: number;
	scriptSig: ScriptSig;
	txinwitness: string[];
	sequence: number;
	value: number;
	address: string|null;
};

export type ScriptPubKey = {
	asm: string;
	hex: string;
	type: string;
	address: string|null;
};

export type Vout = {
	value: number;
	n: number;
	scriptPubKey: ScriptPubKey;
};

export type Transaction = {
	hex: string;
	txid: string;
	hash: string;
	size: number;
	vsize: number;
	version: number;
	locktime: number;
	confirmedHeight: number|null;
	vin: Vin[];
	vout: Vout[];
	fee: number;
	counterparty: CounterParty|undefined;
};

export type BlockBase = {
	header: string;
	hash: string;
	version: number;
	previousblockhash: string;
	merkleroot: string;
	time: number;
	bits: string;
	difficulty: number;
	nonce: number;
	size: number;
	strippedsize: number;
	weight: number;
	height: number | null;
};

export type BlockHeader = BlockBase & {
	ntxs: number,
};

export type BlockWithTxids = BlockBase & {
	txids: string[];
};

export type BlockWithTxs = BlockBase & {
	txs: Transaction[];
};

export type Utxo = {
	txid: string;
	vout: number;
	scriptPubKey: ScriptPubKey;
	value: number;
};

export type BlockSummaryEntry = {
	time: number;
	nonce?: number;
	size: number;
	strippedsize: number;
	weight: number;
	txcount: number;
};

export type BlockSummary = BlockSummaryEntry[];

export type RichListEntry = {
	scriptPubKey: string;
	value: number;
};

export type RichList = RichListEntry[];

