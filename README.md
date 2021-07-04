chainseeker-lib
===============

[![Node.js CI](https://github.com/chainseeker/chainseeker-client/actions/workflows/node.js.yml/badge.svg)](https://github.com/chainseeker/chainseeker-client/actions/workflows/node.js.yml)
[![npm version](https://badge.fury.io/js/chainseeker.svg)](https://badge.fury.io/js/chainseeker)
[![codecov](https://codecov.io/gh/chainseeker/chainseeker-client/branch/master/graph/badge.svg?token=TL07DPRS4M)](https://codecov.io/gh/chainseeker/chainseeker-client)

The official JavaScript/TypeScript API client for [chainseeker.info](https://chainseeker.info/).

Install
-------

```
$ npm install chainseeker
```

Then, you can require (Node.js) or import (TypeScript) the library.

```
import { Chainseeker } from 'chainseeker';
const cs = new Chainseeker();
```

Configure
---------

The default API endpoint is set to `https://btc-v3.chainseeker.info/api`.
If you want to use other servers, you can change the endpoint by passing endpoint URL to the `Chainseeker` constructor.

```
// Testnet
const cs = new Chainseeker('https://tbtc-v3.chainseeker.info/api');
```

```
// Signet
const cs = new Chainseeker('https://sbtc-v3.chainseeker.info/api');
```

```
// Monacoin
const cs = new Chainseeker('https://mona-v3.chainseeker.info/api');
```

API
---

The object type returned by the client is defined in [./src/types.ts](./src/types.ts).

### getStatus(): Status

Get the synchronization status.

### getBlockHeader(blockIdOrHeight: string|number): BlockHeader

Get a block data without any transaction information.

### getBlockWithTxids(blockIdOrHeight: string|number): BlockWithTxids

Get a block data with transaction IDs included in the block.

### getBlockWithTxs(blockIdOrHeight: string|number): BlockWithTxs

Get a block data with transactions included in the block.

Warning: this API may return a huge (~10MiB) data.
If you want a small chunk of transactions in a block, call `getBlockWithTxids()` and fetch transactions with `getTransaction()`.

### getTransaction(txid: string): Transaction

Get a transaction data.

### getTxIds(address: string): string[]

Get the array of transaction ids related to an address.

### getUtxos(address: string): Utxo[]

Get UTXOs for the given address.

### putTransaction(rawtx: string): string

Broadcast a raw transaction data.
On success, return the transaction ID.

### getBlockSummary(offset: number, limit: number) BlockSummaryEntry[]

Get a block summary data, including nonces, sizes of a block and the number of transactions.

### getRichListCount: number

The number of addresses in the rich list.

### getRichList(offset: number, limit: number): RichListEntry[]

Get the `(offset + 1)`-th to `(offets + limit + 1)-th` richest addresses.
The `offset` starts from zero.

### getRichListRank(address: string): number|null

Get the rich list rank of a given address.
The rank starts with one.

