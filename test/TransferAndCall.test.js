const decimals_string_18dec = "000000000000000000";


var WasderToken = artifacts.require("WasderToken");
var ERC677Mock = artifacts.require("ERC677Mock");
 
const { BN, ether, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
function tokens(n) {
    return web3.utils.toWei(n, 'ether');
}

contract('WasderToken - Transfer and call', function(accounts) {
    const [ owner, mintToAccount, ...otherAccounts ] = accounts;
    const amountInTokens = "100"+decimals_string_18dec;
    beforeEach(async function () {
        this.token = await WasderToken.new();
        this.receiverToken = await ERC677Mock.new("Receiver token", "RTT", owner, "1000000000"+decimals_string_18dec);

    });

    describe('WasderToken - Transfer and call', function () {

        it('it is possible to transfer and call another contract', async function () {

            let owner_balance_before = await this.token.balanceOf(owner);
            let receiver_balance_before = await this.token.balanceOf(this.receiverToken.address);
            //console.log("owner_balance_before: %s", owner_balance_before);
            //console.log("receiver_balance_before: %s", receiver_balance_before);
            
            //NOTE: minted all ERC677 mock tokens to the owner at creation

            //transfer tokens
            var transferAndCallResult = await this.token.transferAndCall(
                this.receiverToken.address, 
                amountInTokens, 
                0x00, 
                { from: owner }
            );
            //console.log(transferAndCallResult);
 
            const event_Transfer = expectEvent.inLogs(transferAndCallResult.logs, 'Transfer', {
                from: owner,
                to: this.receiverToken.address,
            });
 
            let logs_OnTokenTransferReceived = await this.receiverToken.getPastEvents( 'OnTokenTransferReceived', { fromBlock: 0, toBlock: 'latest' } )
            //console.log(logs_OnTokenTransferReceived[0].args._value);
            assert.equal(logs_OnTokenTransferReceived[0].args._sender, owner);
            assert.equal(logs_OnTokenTransferReceived[0].args._data, '0x00');

 
            let owner_balance_after = await this.token.balanceOf(owner);
            let receiver_balance_after = await this.token.balanceOf(this.receiverToken.address);
            //console.log("owner_balance_after: %s", owner_balance_after);
            //console.log("receiver_balance_after: %s", receiver_balance_after);

            
            assert.equal(owner_balance_after.toString(), "999999900" + decimals_string_18dec);
            assert.equal(receiver_balance_after.toString(), amountInTokens.toString());


        });


    });


});

function printLogs(title, logs) {
    for (let i = 0; i < logs.length; i++) {
        console.log();
        console.log(`${title} event #${i + 1}:`);
        console.log(JSON.stringify(logs[i], null, 4));
    }
}