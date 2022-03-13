const Players = artifacts.require("Players");

module.exports = function (deployer) {
    deployer.deploy(Players);
};
