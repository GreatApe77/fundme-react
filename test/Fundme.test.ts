import {

  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";


describe("Fundme", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  
  async function deployFundMeFixture(){
    const [owner,account2,account3] = await ethers.getSigners()
    const FundMeFactory = await ethers.getContractFactory("FundMe")

    const fundMe = await FundMeFactory.deploy()

    return { fundMe,owner,account2,account3}
  }

  it("Owner should be who deploys",async()=>{
    const {fundMe,owner} = await loadFixture(deployFundMeFixture)

    const retrievedOwner = await fundMe.owner()

    expect(retrievedOwner===owner.address,"Owners were different")
  })
  
});
