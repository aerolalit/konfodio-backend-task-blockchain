
var Block  = require('../src/block');
const crypto = require("crypto-js");
var expect = require("chai").expect;

describe('Block', function() { 
  describe('#encodeBlock()', function(){
        it('should return a encoded string of block', function(){
            var t = [[1,2,3],[4,5,6]];
            var pBH = 'xyz';
            var bl = new Block(t, pBH);
            var blockHash = crypto.SHA256([pBH, '0', JSON.stringify(t)].join(', ')).toString();
            var myEncodedBlock = blockHash + ', ' + pBH + ', ' + '0' + ', ' + JSON.stringify(t);
            expect(bl.encodeBlock()).to.equal(myEncodedBlock);
        });
  });

  describe('#decodeBlock()', function(){
    it('it should return a block object', function(){
      var t = [[1,2,3],[4,5,6]];
      var pBH = 'xyz';
      var bl = new Block(t, pBH);
      var blockHash = crypto.SHA256([pBH, '0', JSON.stringify(t)].join(', ')).toString();
      var myEncodedBlock = blockHash + ', ' + pBH + ', ' + '0' + ', ' + JSON.stringify(t);

      expect(JSON.stringify(bl)).to.eql(JSON.stringify(bl.decodeBlock(myEncodedBlock)));
    });
  });

  describe('#addTransaction()', function(){
    it('it should add a transaction to a block', function(){
      var t = [[1,2,3],[4,5,6]];
      var pBH = 'xyz';
      var bl = new Block(t, pBH);
      bl.addTransaction([7,8,9]);
      expect([[1,2,3],[4,5,6],[7,8,9]]).to.eql(bl.getBlockTransactions());
    });
  });

  describe('#transactionCount()', function(){
    it('it should return the number of transaction in the block', function(){
      var t = [[1,2,3],[4,5,6]];
      var pBH = 'xyz';
      var bl = new Block(t, pBH);
      expect(bl.transactionCount()).to.equal(2);
      bl.addTransaction([7,8,9]);
      expect(bl.transactionCount()).to.equal(3);
    });
  });

  describe('#getBlockTransactions()', function(){
    it('it should return all transactions in a block', function(){
      var t = [[1,2,3],[4,5,6]];
      var pBH = 'xyz';
      var bl = new Block(t, pBH);
      expect(bl.getBlockTransactions()).to.eql([[1,2,3],[4,5,6]]);
      bl.addTransaction([7,8,9]);
      expect(bl.getBlockTransactions()).to.eql([[1,2,3],[4,5,6],[7,8,9]]);
    });
  });

  describe('#mineBlock()', function(){
    it('it should return a hash value after the block is mined', function(){
      var t = [[1,2,3],[4,5,6]];
      var pBH = '0';
      var bl = new Block(t, pBH);
      var hash = bl.mineBlock();
      expect(hash.substring(0,4)).to.equal((1234).toString());

    });
  });


  describe('#getBlockHash', function(){
    it('it should return hash of a block', function(){
      var t = [[1,2,3],[4,5,6]];
      var pBH = '0';
      var bl = new Block(t, pBH);
      hash = bl.getBlockHash();
      expect(hash.length).to.equal(64);
      expect(hash).match(/[0-9]|[a-f]/);
    });
  });
});