var WasderToken = artifacts.require("WasderToken");

const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');


contract('WasderToken - BurnableToken', function(accounts) {

    const [ owner, newOwner, burner, mintToAccount, ...otherAccounts ] = accounts;

    const decimals_string_18dec = "000000000000000000";
    const tokensToBurn = "100" + decimals_string_18dec;

    beforeEach(async function () {
        this.token = await WasderToken.new();
    });

    
    describe('WasderToken - burn', function () {

        it('manage admin and burner role', async function () {
 
            const DEFAULT_ADMIN_ROLE = await this.token.DEFAULT_ADMIN_ROLE.call();
            // console.log(await this.token.hasRole(DEFAULT_ADMIN_ROLE, owner));
            // console.log(await this.token.hasRole(DEFAULT_ADMIN_ROLE, newOwner));
            assert.equal(await this.token.hasRole(DEFAULT_ADMIN_ROLE, owner), true);
            assert.equal(await this.token.hasRole(DEFAULT_ADMIN_ROLE, newOwner), false);
 
            grantAdmin_logs = await this.token.grantRole(DEFAULT_ADMIN_ROLE, newOwner, { from: owner });
            revokeAdmin_logs = await this.token.revokeRole(DEFAULT_ADMIN_ROLE, owner, { from: owner });

            // console.log(await this.token.hasRole(DEFAULT_ADMIN_ROLE, owner));
            // console.log(await this.token.hasRole(DEFAULT_ADMIN_ROLE, newOwner));
            assert.equal(await this.token.hasRole(DEFAULT_ADMIN_ROLE, owner), false);
            assert.equal(await this.token.hasRole(DEFAULT_ADMIN_ROLE, newOwner), true);
 
        });

        it('it is possible to burn token if is burner role', async function () {
 
            // set owner as burner
            // total supply
            // owner supply
            // ({ logs: this.logs } = await this.token.burn(amount, { from: owner }));
            // total supply
            // owner supply
            const BURNER_ROLE = await this.token.BURNER_ROLE.call();
            

            grantRole_logs = await this.token.grantRole(BURNER_ROLE, owner, { from: owner });
            //console.log(grantRole_logs);
            //return;

            let totalsupply_before = await this.token.totalSupply();
            let owner_balance_before = await this.token.balanceOf(owner);
            //console.log("owner_balance_before: %s", owner_balance_before);
            //console.log("totalsupply_before: %s", totalsupply_before);
            
            burn_logs = await this.token.burn(tokensToBurn, { from: owner });
            //console.log(burn_logs);
            //console.log(burn_logs.logs[0]);
            assert.equal(burn_logs.logs[0].event, "Transfer");
            assert.equal(burn_logs.logs[0].args.from, owner);
            assert.equal(burn_logs.logs[0].args.to, "0x0000000000000000000000000000000000000000");

            let totalsupply_after = await this.token.totalSupply();
            let owner_balance_after = await this.token.balanceOf(owner);
            //console.log("owner_balance_after: %s", owner_balance_after);
            //console.log("totalsupply_after: %s", totalsupply_after);

            assert.equal(totalsupply_after, "999999900000000000000000000");
            assert.equal(owner_balance_after, "999999900000000000000000000");

        });


    });
});