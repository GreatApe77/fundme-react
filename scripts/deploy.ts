import { ethers } from "hardhat";

async function main() {
  console.log("Deploying")
  const FundMeFactory = await ethers.getContractFactory("FundMe")
  const fundMe = await FundMeFactory.deploy()
  console.log(`Deployed at ${await fundMe.getAddress()}`)
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
