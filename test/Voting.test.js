const { assert } = require("chai");
const {developmentChains} = require("../helper-hardhat-config");
const { deployments, ethers, network } = require("hardhat");

!developmentChains.includes(network.name)
?describe.skip:
describe("Voting contract", function () {
  it("Only owner can approve voter", async function () {
    await deployments.fixture(["Voting"]);
    const [, addr1, addr2] = await ethers.getSigners();
    const votingContract = await ethers.getContract("Voting", addr1);
    try {
      await votingContract.approveVoter(addr2);
    } catch (error) {
      assert(error.message.includes("You are not the owner"), "Owner access not verified");
    }
  })

  it("Only approved voter should be able to vote", async function () {
    await deployments.fixture(["Voting"]);
    const [, addr1] = await ethers.getSigners();
    const votingContract = await ethers.getContract("Voting", addr1);
    try {
      await votingContract.vote(0);
    } catch (error) {
      assert(error.message.includes("You are not approved to vote"), "Only approved voter can check");
    }
  })

  it("Valid index vote is required for voting", async function() {
    await deployments.fixture(["Voting"]);
    const votingContract = await ethers.getContract("Voting");
    try {
      votingContract.vote(3);
    } catch (error) {
      assert(error.message.includes("Invalid voting ID"), "Valid voting id test invalid");
    }
  })

  it("Winner without voting", async function() {
    await deployments.fixture(["Voting"]);
    const votingContract = await ethers.getContract("Voting");
    assert((await votingContract.getWinner())=="null", "Null answer without vote");
  })

  it("Winner with voting", async function() {
    await deployments.fixture(["Voting"]);
    const votingContract = await ethers.getContract("Voting");
    await votingContract.vote(1);
    assert((await votingContract.getWinner())=="aabha", "Correct winner output")
  })

  it("A voter can vote only once", async function() {
    await deployments.fixture(["Voting"]);
    const [, addr1] = await ethers.getSigners();
    const votingContract = await ethers.getContract("Voting");
    await votingContract.approveVoter(addr1);
    await votingContract.connect(addr1).vote(1);
    try {
      votingContract.approveVoter(addr1);
    } catch (error) {
      assert(error.message.includes("You have already voted"), "Contract fault: voter is able to vote twice");
    }
  })
})

// !developmentChains.includes(network.name)
// ?describe.skip
// :describe("Voting contract", function () {
//   async function deployVotingFixture() {
//     const voting = await ethers.deployContract("Voting", [["soham", "aabha"]]);
//     return voting;
//   }

//   it("Only owner can approve voter", async function(){
//     const [owner, addr1, addr2] = await ethers.getSigners();
//     const voting = await loadFixture(deployVotingFixture);
//     try {
//       await voting.connect(addr1).approveVoter(await addr2.getAddress());      
//     } catch (error) {
//       assert(error.message.includes("You are not the owner"), "Owner access verified");
//     }
//   })
// 
//   it("Only approved voter should be able to vote", async function () {
//     const voting = await loadFixture(deployVotingFixture);
//     const [, addr1] = await ethers.getSigners();
//     try {
//       await voting.connect(addr1).vote(0);
//     } catch (error) {
//       assert(error.message.includes("You are not approved to vote"), "Only approved voter can check");
//     }
//   })

//   it("Valid index vote is required for voting", async function() {
//     const voting = await loadFixture(deployVotingFixture);
//     const owner = await ethers.getSigners();
//     try {
//       voting.vote(3);
//     } catch (error) {
//       assert(error.message.includes("Invalid voting ID"), "Valid voting id test invalid");
//     }
//   })

//   it("Winner without voting", async function() {
//     const voting = await loadFixture(deployVotingFixture);
//     assert((await voting.getWinner())=="null", "Null answer without vote");
//   })

//   it("Winner with voting", async function() {
//     const voting = await loadFixture(deployVotingFixture);
//     await voting.vote(1);
//     assert((await voting.getWinner())=="aabha", "Correct winner output")
//   })

//   it("A voter can vote only once", async function() {
//     const voting = await loadFixture(deployVotingFixture);
//     const [owner, addr1] = await ethers.getSigners();
//     await voting.approveVoter(addr1);
//     await voting.connect(addr1).vote(1);
//     try {
//       voting.approveVoter(addr1);
//     } catch (error) {
//       assert(error.message.includes("You have already voted"), "Contract fault: voter is able to vote twice");
//     }
//   })
// })