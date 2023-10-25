const { ProviderWrapper } = require("hardhat/plugins");

require("@nomicfoundation/hardhat-ethers");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
require('@nomicfoundation/hardhat-chai-matchers');
require('@nomicfoundation/hardhat-ethers');
require('@typechain/hardhat');
require('hardhat-gas-reporter');
require('solidity-coverage');
require("dotenv").config();

SEPOLIA_URL = process.env.RPC_URL;
ETHERSCAN_API = process.env.ETHERSCAN_API;
PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      tags: ["test", "staging"]
    },
    sepolia: {
      url: SEPOLIA_URL,
      chainId: 11155111,
      accounts: [PRIVATE_KEY],
      blockConfirmations: 12,
      tags: ["staging"],
      verify: {
        etherscan: {
          apiKey: ETHERSCAN_API
        }
      }
    }
  },
  namedAccounts: {
    deployer: {
      "hardhat": 0,
      "sepolia": 0
    }
  }
};
