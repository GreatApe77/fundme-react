import { ethers } from "hardhat";
import {saveDeployment} from "deployment-history"
async function main() {
  console.log("Deploying")
  const network = await ethers.provider.getNetwork()
  const FundMeFactory = await ethers.getContractFactory("FundMe")
  const fundMe = await FundMeFactory.deploy()
  const address = await fundMe.getAddress()
  console.log(`Deployed at ${address} on ${network.name}`)
  saveDeployment("FundMe "+address,network.name)
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
