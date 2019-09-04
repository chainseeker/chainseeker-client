chainseeker-lib
===============

This is an API library to use with chainseeker.info.

Install
-------

```
$ npm install chainseeker-lib
```

Then, you can require (Node.js) or import (TypeScript) the library.

### Node.js

```
const cs = require('chainseeker-lib');
```

### TypeScript

```
import * as cs from 'chainseeker-lib';
```

Configure
---------

The default API endpoint is set to `https://btc.chainseeker.info/api`.
If you want to use other servers, you can change the endpoint as follows.

```
cs.setApiEndPoint('https://mona.chainseeker.info/api');
```

Library API
-----------

We implements either the traditional [RESTful APIs](https://chainseeker.docs.apiary.io/) and the GraphQL API.
If you want to retrieve multiple data from the server, please use the GraphQL API.

### REST APIs

Please consult the REST API docs [here](https://chainseeker.docs.apiary.io/) for more details especially for the return values.

#### getStatus()

Get the synchronization status.

#### getBlock(blockIdOrHeight: string|number)

Get a block data.

#### getTransaction(txid: string)

Get a transaction data.

#### getTxIds(address: string)

Get the array of transaction ids related to an address.

#### getUtxos(address: string)

Get UTXOs for the given address.

#### putTransaction(rawtx: string)

Broadcast a raw transaction data.

### GraphQL APIs

GraphQL APIs are useful especially for retrieving multiple or large data, since you can fetch the data you want int a single HTTP query to the server.

#### getGraphQL(query: string, variables: object)

Query a GraphQL raw query data.
You can retrieve multiple data with a single call to the server:

```
query BlockSummary {
  status {
    blocks
  }
  block(id: 0) {
    hash
  }
  blockSummary(offset: 0, limit: 10) {
    nonce
  }
}
```

#### getBlocks(blockIdsOrHeights: (string|number)[])

Get blocks with a given IDs or heights.

#### getTransactions(txids: string[])

Get transactions.

#### getBlockSummary(offset: number, limit: number, items: string[])

Get a block summary data, including nonces, sizes of a block and the number of transactions.

#### getAddressBalances(offset: number, limit: number)

Get the balance of the addresses sorted by its value (amount).
It is a so-called 'rich list' of blockchain addresses.




