
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
	confirmed_height: number|null;
	vin: Vin[];
	vout: Vout[];
	fee: number;
	counterparty: CounterParty|undefined;
};

export type Block = {
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
	height: number|null;
	txids: string[];
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

export type AddressBalanceEntry = {
	scriptPubKey: string;
	address: string | null;
	value: number;
};

export type AddressBalance = {
	count: number;
	data: AddressBalanceEntry[];
};

