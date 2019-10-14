const  MINING_DIFFICULTY = 4;
const crypto = require("crypto-js");

var Block = ( function (blockTransactions, prevBlockHash) {
    var nonce = 0;

    var calculateHash = function(){
        return crypto.SHA256([prevBlockHash, nonce, JSON.stringify(blockTransactions)].join(', ')).toString();
    };

    var blockHash = calculateHash();

    var addTransaction = function (transaction){
        blockTransactions.push(transaction);
    };

    var transactionCount = function(){
        return blockTransactions.length;
    };

    var mineBlock = function(){
        var puzzle = (function (N) {
            result = '';
            for(var i=1; i<= N; i++){
                result += i;
            }
            return result;
        })(MINING_DIFFICULTY);

        while(blockHash.substring(0,MINING_DIFFICULTY) !=  puzzle){
            nonce += 1;
            blockHash = calculateHash();
        }
        return blockHash;
    };

    var encodeBlock = function(){
        return [blockHash, prevBlockHash, nonce.toString(), JSON.stringify(blockTransactions)].join(', ');
    };

    var decodeBlock = function (encodedBlock) {
        var arr = encodedBlock.split(', ');
        return new Block(JSON.parse(arr[3]), arr[1]);
    };

    var getBlockTransactions = function(){
        return blockTransactions;
    };

    var getBlockHash = function(){
        return blockHash;
    };
    
    return { 
        addTransaction: addTransaction,
        transactionCount: transactionCount,
        mineBlock: mineBlock,
        encodeBlock: encodeBlock,
        decodeBlock: decodeBlock,
        getBlockTransactions: getBlockTransactions,
        getBlockHash: getBlockHash,
    };

});

module.exports = Block;

