const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { assert } = require("chai");


describe("Voting contract", function () {
  async function deployVotingFixture() {
    const voting = await ethers.deployContract("Voting", [["soham", "aabha"]]);
    return voting;
  }

  it("Only owner can approve voter", async function(){
    const [owner, addr1, addr2] = await ethers.getSigners();
    const voting = await loadFixture(deployVotingFixture);
    try {
      await voting.connect(addr1).approveVoter(await addr2.getAddress());      
    } catch (error) {
      console.log(error.message);
      assert(error.message.includes("You are not the owner"), "Owner access verified");
    }
  })
})