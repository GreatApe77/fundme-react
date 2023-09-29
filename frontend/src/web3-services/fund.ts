
import { getContract } from "./web3Config";
import { utils } from "ethers";

export async function fund(amount: string, from: string) {
	const contract = getContract(from);
	try {
		const transaction = await contract.methods
			.fund()
			.send({
				from: from,
				value: utils.parseUnits(amount, "ether").toString(),
			});
		return transaction;
	} catch (error) {
		console.error(error);
		throw new Error("Error in funding");
	}
}
