var BlockChain  = require('../src/blockchain');
var expect = require("chai").expect;

describe('BlockChain', function(){
    describe('#init()', function(){
        this.timeout(60000); // mining blocks takes lot of time
        it('It should initiate a blockchain', function(){
            var bl = new BlockChain();
            bl.init([100, 100, 500], [[0, 1, 50], [1, 2, 80]], 2);
            expect(bl.getAccountBalance(0)).to.equal(50);
        });
    });

    describe('#getAccountBalance()', function(){
        this.timeout(60000); // mining blocks takes lot of time
        it('It returns the account balance of the wallet', function(){
            var bl = new BlockChain();
            bl.init([100, 100, 500], [[0, 1, 50], [1, 2, 80],[]], 2);
            expect(bl.getAccountBalance(0)).to.equal(50);

            var bl2 = new BlockChain();
            bl2.init([100, 100, 500], [[0, 1, 50], [1, 2, 80], [2, 0, 450],[1,0, 70],[0,-1,20]], 2);
            expect(bl2.getAccountBalance(0)).to.equal(550);
            expect(bl2.getAccountBalance(1)).to.equal(0);
            expect(bl2.getAccountBalance(2)).to.equal(130);

        });
    });
});