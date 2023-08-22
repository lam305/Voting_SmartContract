const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting Contract", function () {
  let votingContract;

  beforeEach(async () => {
    const Voting = await ethers.getContractFactory("Voting");
    votingContract = await Voting.deploy(["Candidate A", "Candidate B"], 10);
    await votingContract.deployed();
  });

  it("should add a candidate and vote", async function () {
    await votingContract.addCandidate("Candidate A");
    await votingContract.addCandidate("Candidate B");

    const candidates = await votingContract.getCandidates();

    expect(candidates[0].voteCount).to.equal(0);
    expect(candidates[1].voteCount).to.equal(0);

    await votingContract.vote(0);
    await votingContract.vote(1);

    const updatedCandidates = await votingContract.getCandidates();

    expect(updatedCandidates[0].voteCount).to.equal(1);
    expect(updatedCandidates[1].voteCount).to.equal(1);
  });

  it("should return remaining time", async function () {
    const remainingTime = await votingContract.getRemainingTime();
    const votingTime = 10 * 60; // 10 minutes in seconds

    expect(remainingTime).to.equal(votingTime);

    // Advance time by 5 minutes
    await network.provider.send("evm_increaseTime", [5 * 60]);

    const newRemainingTime = await votingContract.getRemainingTime();

    expect(newRemainingTime).to.equal(votingTime - 5 * 60);
  });
});
