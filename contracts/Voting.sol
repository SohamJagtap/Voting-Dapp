// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

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

    constructor(string[] memory _candidateNames) {
        chairperson = msg.sender;
        voters[chairperson].approved = true;
        for(uint i=0; i<_candidateNames.length; i++)
        {
            candidates.push(Candidate(_candidateNames[i], 0));
        }
    }

    function approveVoter(address _voterId) public onlyOwner {
        require(!voters[_voterId].approved, "You have already voted");
        voters[_voterId].approved = true;
    }

    function vote(uint _id) public {
        require(voters[msg.sender].approved, "You are not approved to vote");
        require(_id<candidates.length, "Invalid voting ID");
        voters[msg.sender].voted = true;
        voters[msg.sender].candidateId = _id;
        candidates[_id].votecount++;
    }

    function getWinner() public view returns (string memory _winner) {
        uint highestVote = 0;
        _winner = "null";
        for(uint i=0; i<candidates.length; i++) {
            if(candidates[i].votecount>highestVote) {
                highestVote = candidates[i].votecount;
                _winner = candidates[i].name;
            }
        }
        return _winner;
    }

}
