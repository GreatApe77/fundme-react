import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { AddressLookupTableInstruction } from "@solana/web3.js";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Fundme", function () {
	// We define a fixture to reuse the same setup in every test.
	// We use loadFixture to run this setup once, snapshot that state,
	// and reset Hardhat Network to that snapshot in every test.

	async function deployFundMeFixture() {
		const [owner, account2, account3] = await ethers.getSigners();
		const FundMeFactory = await ethers.getContractFactory("FundMe");

		const fundMe = await FundMeFactory.deploy();

		return { fundMe, owner, account2, account3 };
	}
	async function sameAccountDonatedTwiceFixture() {
		const { fundMe, owner, account2 } = await loadFixture(deployFundMeFixture);
		const amountToBeDonated = ethers.parseUnits("0.2", "ether");
		const instance = await fundMe.connect(account2);
		await instance.fund({ value: amountToBeDonated });
		await instance.fund({ value: amountToBeDonated });
		const funder = await instance.funderByAddress(account2.address);
		return { fundMe, owner, account2 };
	}
	it("Owner should be who deploys", async () => {
		const { fundMe, owner } = await loadFixture(deployFundMeFixture);

		const retrievedOwner = await fundMe.owner();

		expect(retrievedOwner === owner.address, "Owners were different");
	});
	it("should NOT fund with less than the minimun amount", async () => {
		const { fundMe, owner, account2 } = await loadFixture(deployFundMeFixture);
		const amountToBeDonated = ethers.parseUnits("0.001", "ether");
		const instance = await fundMe.connect(account2);

		await expect(
			instance.fund({ value: amountToBeDonated })
		).to.be.revertedWith("Donate more");
	});
	it("should  fund with at least the the minimun amount", async () => {
		const { fundMe, owner, account2 } = await loadFixture(deployFundMeFixture);
		const amountToBeDonated = ethers.parseUnits("0.01", "ether");
		const currentContractBalance = await fundMe.getContractBalance();
		const instance = await fundMe.connect(account2);
		await instance.fund({ value: amountToBeDonated });

		expect(
			amountToBeDonated.toString() === currentContractBalance.toString(),
			"Values were different"
		);
	});
	it("Should fund 0.2 ETH and populates the mapping and the array with the correct values and addresses", async () => {
		const { fundMe, owner, account2 } = await loadFixture(deployFundMeFixture);
		const amountToBeDonated = ethers.parseUnits("0.2", "ether");
		const instance = await fundMe.connect(account2);
		await instance.fund({ value: amountToBeDonated });
		await instance.fund({ value: amountToBeDonated });
		const funder = await instance.funderByAddress(account2.address);
		const expectedValue = ethers.parseUnits("0.4", "ether");
		const funderAdressesMatch = funder.funderAddress === account2.address;
		const valuesMatch =
			funder.amountFunded.toString() === expectedValue.toString();
		expect(
			funderAdressesMatch && valuesMatch,
			"Something wrong with fund function"
		);
	});
	it("Size of allFunders must be only one", async () => {
		const { fundMe, owner, account2 } = await loadFixture(
			sameAccountDonatedTwiceFixture
		);
		const funders = await fundMe.getAllFunders();
		const firstFunder = await fundMe.allFundersAddresses(0);
		expect(
			funders.length === 1 && funders[0].funderAddress === firstFunder,
			"Funders were not updated accordingly (sei la kkk)"
		);
	});
	it("Should get a current minimun value of 0.01 and set it to 5", async () => {
		const { fundMe, owner, account2 } = await loadFixture(deployFundMeFixture);
		const previousPrice = await fundMe.minimunPrice();
		await fundMe.setMinimunDonation(ethers.parseUnits("5", "ether"));
		const newPrice = await fundMe.minimunPrice();
		expect(
			newPrice.toString() === ethers.parseUnits("5", "ether").toString() &&
			previousPrice.toLocaleString() === ethers.parseUnits("0.01", "ether").toString()
		);
	});
  it("Should be withdraw 0.01 eth to the owner", async () => {
		const { fundMe, owner, account2 } = await loadFixture(sameAccountDonatedTwiceFixture);
    const prevBalance = await ethers.provider.getBalance(owner)
    const withdrawValue = ethers.parseUnits("0.01","ether")
    await fundMe.withdraw(withdrawValue)
    const currBalance = await ethers.provider.getBalance(owner)

    expect((prevBalance+withdrawValue) ===currBalance,"Balances were different")
	});
});
