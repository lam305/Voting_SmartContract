async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const candidateNames = ['John Wick', 'Rocky', 'The Rock', 'James Bond', 'Bruce Lee'];
  const votingTime = 360;
  
  const Voting = await ethers.getContractFactory("Voting");
  const VotingContract = await Voting.deploy(candidateNames, votingTime);

  console.log("Contract address:", VotingContract.target);
} 

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
