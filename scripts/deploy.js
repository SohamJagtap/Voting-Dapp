// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const {verify} = require("../utils/verify");
const { developmentChains } = require("../helper-hardhat-config");

async function main() {
  const [owner] = await hre.ethers.getSigners()
  const args = ["soham", "aabha"];
  const voting = await ethers.deployContract("Voting", [args], {gasPrice: 1000});
  await voting.waitForDeployment();
  console.log(await voting.getAddress());
  if (!developmentChains.includes(hre.network.name)) {
    verify(await voting.getAddress(), [args]);
  }
}

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
