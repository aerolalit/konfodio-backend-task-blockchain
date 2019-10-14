var Block = require('./block');
var GENESIS_BLOCK_PREV_HASH = '0';

var BlockChain = (function () {
    var chain = [];  
    var pT ;    // pendingTransactions
    var bS ;    // blockSize

    
    init = function(initialBalances, transactions, blockSize){
        pT = transactions;
        bS = blockSize;
        
        block = createGenesisBlock();
        for (var i=0; i< initialBalances.length; i++){
            if(block.transactionCount() < bS){
                block.addTransaction([-1, i, initialBalances[i]]);
            } else {
                block.mineBlock();
                addBlocktoChain(block);
                block = new Block([], getLastBlockHash());
                block.addTransaction([-1,i,initialBalances[i]]);
            }
           
        }

        if (block.transactionCount() >0){
            block.mineBlock();
            addBlocktoChain(block);
        }

        minePendingTransactions();
    };

    getLastBlockHash = function(){
        if (chain.length >0){
            b = new Block([],'');
            return b.decodeBlock(chain[chain.length-1]).getBlockHash();
        } 
        return GENESIS_BLOCK_PREV_HASH;
    };

    createGenesisBlock = function (){
        return new Block([], GENESIS_BLOCK_PREV_HASH);
    };

    addBlocktoChain = function (block){
        chain.push(block.encodeBlock());
    };

    getAccountBalance = function (accountIndex) {
        var balance =0;
        for(var i=0; i< chain.length; i++){
            var b = new Block();
            var transactions = b.decodeBlock(chain[i]).getBlockTransactions();
            for(var j=0; j< transactions.length; j++){
                var transaction = transactions[j];
                if(transaction[0] == accountIndex){
                    balance -= transaction[2];
                } else if (transaction[1] == accountIndex){
                    balance += transaction[2];
                }
            }
        }
        return balance;
    };

    minePendingTransactions = function(){
        var balanceMap = {};
        block = new Block([], getLastBlockHash());
        for(var i=0; i< pT.length; i++){
            var transaction = pT[i];
            var fromAddress = transaction[0];
            var toAddress = transaction[1];
            var amount = transaction[2];
            
            if (! (fromAddress in balanceMap)){
                balanceMap[fromAddress] = getAccountBalance(fromAddress);
            }
            if (! (toAddress in balanceMap)){
                balanceMap[toAddress] = getAccountBalance(toAddress);
            }
            if (amount<= balanceMap[fromAddress]){
                balanceMap[fromAddress] -= amount;
                balanceMap[toAddress] += amount;
                block.addTransaction(transaction);
            }
            if (block.transactionCount() == bS){
                block.mineBlock();
                addBlocktoChain(block);
                block = new Block([], getLastBlockHash());
            }
            
        }
        if (block.transactionCount() >0){
            block.mineBlock();
            addBlocktoChain(block);
        }

    };

    return {
        init:init,
        getAccountBalance:getAccountBalance,
    };
    
});

module.exports = BlockChain;
