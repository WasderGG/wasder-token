const WasderToken = artifacts.require("WasderToken");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(WasderToken, accounts[0], { from: accounts[0] } );
};
