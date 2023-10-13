// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Voting {
    struct Candidate {
        string name;
        uint votecount;
    }
    
    struct Voter {
        uint candidateId;
        bool voted;
        bool approved;
    }

    Candidate[] public candidates;

    mapping (address => Voter) voters;

    address chairperson;

    modifier onlyOwner() {
        require(msg.sender==chairperson, "You are not the owner");
        _;
    }

    constructor(string[] memory candidateNames) {
        chairperson = msg.sender;
        voters[chairperson].approved = true;
        for(uint i=0; i<candidateNames.length; i++)
        {
            candidates.push(Candidate(candidateNames[i], 0));
        }
    }

    function approveVoter(address voterId) onlyOwner public {
        require(!voters[voterId].approved, "You have already voted");
        voters[voterId].approved = true;
    }

    function vote(uint id) public {
        require(voters[msg.sender].approved);
        require(voters[msg.sender].voted);
        voters[msg.sender].voted = true;
        voters[msg.sender].candidateId = id;
    }

    function getWinner() public view returns (string memory _winner) {
        uint highestVote = 0;
        for(uint i=0; i<candidates.length; i++) {
            if(candidates[i].votecount>highestVote) {
                highestVote = candidates[i].votecount;
                _winner = candidates[i].name;
            }
        }
    }

}
