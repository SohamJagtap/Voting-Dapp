const { ProviderWrapper } = require("hardhat/plugins");

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

SEPOLIA_URL = process.env.RPC_URL;
ETHERSCAN_API = process.env.ETHERSCAN_API;
PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      chainId: 11155111,
      accounts: [PRIVATE_KEY],
      blockConfirmations: 12
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API
  }
};
