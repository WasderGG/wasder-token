

var WasderToken = artifacts.require("WasderToken");
const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');


contract('WasderToken - Snapshot', function(accounts) {

    const [ owner, receiver, ...otherAccounts ] = accounts;
    
    beforeEach(async function () {
        this.token = await WasderToken.new(owner);
    });

    it('it is possible to create snapshot', async function () {

        let totalsupply_before = await this.token.totalSupply();

        const { logs1 } = await this.token.snapshot();

        let balance_receiver_at_snapshot1 = await this.token.balanceOfAt(receiver, 1);
        console.log("balance_receiver_at_snapshot1: %s", balance_receiver_at_snapshot1)
        assert.equal(balance_receiver_at_snapshot1, "0");

        let transfer_logs1 = await this.token.transfer(receiver, new BN('2'), {from: owner});

        const { logs2 } = await this.token.snapshot();

        let transfer_logs2 = await this.token.transfer(receiver, new BN('2'), {from: owner});

        let balance_receiver_at_snapshot2 = await this.token.balanceOfAt(receiver, 2);
        console.log("balance_receiver_at_snapshot2: %s", balance_receiver_at_snapshot2)
        assert.equal(balance_receiver_at_snapshot2, "2");

        let balance_receiver_now = await this.token.balanceOf(receiver);
        console.log("balance_receiver_now: %s", balance_receiver_now)
        assert.equal(balance_receiver_now, "4");

    });


});