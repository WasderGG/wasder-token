const WasderToken = artifacts.require("WasderToken");

module.exports = function (deployer) {
  deployer.deploy(WasderToken);
};
