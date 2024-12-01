// scripts/deploy.js

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const ContractFactory = await ethers.getContractFactory("MyContract");
    const contract = await ContractFactory.deploy(); // Make sure to await here
  
    console.log("Contract deployed to:", contract.address);  // This should now correctly print the address
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  