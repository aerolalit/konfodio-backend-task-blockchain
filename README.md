# konfodio-backend-task-blockchain [![Build Status](https://travis-ci.org/aerolalit/konfodio-backend-task-blockchain.svg?branch=develop)](https://travis-ci.org/aerolalit/konfodio-backend-task-blockchain)

JavaScript library of Simple BlockChain.

## Node.js (Install)

Requirements:

- Node.js
- npm (Node.js package manager)

```bash
npm install konfodio-backend-task-blockchain
```

### Usage


```javascript
var BlockChain = require('konfodio-backend-task-blockchain');

var bl = new BlockChain();
bl.init([100, 100, 500], [[0, 1, 50], [1, 2, 80]], 2);
bl.getAccountBalance(0);
bl.getAccountBalance(1);
bl.getAccountBalance(2);

```
