require("@nomiclabs/hardhat-waffle");
const fs = require("fs")

const privateKey = fs.readFileSync(".secret").toString();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/lomagLtFAAR6wLySr-jvAKkEuaTWIWw6`,
      gasPrice: 20000000000,
      gas: 6000000,
      accounts: [privateKey]
    },
    mainnet: {
      url: `https://polygon-mainnet.infura.io/v3/b810a8e018e24658b42bf8579c1645f0`,
      gasPrice: 20000000000,
      gas: 6000000,
      accounts: [privateKey]
    }
  },
  solidity: "0.8.17",
};