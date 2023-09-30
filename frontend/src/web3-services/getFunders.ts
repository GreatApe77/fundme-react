
import { getContract } from "./web3Config";
import { MatchPrimitiveType } from "web3";
export type Funders =  {
    funderAddress: string;
    amountFunded: MatchPrimitiveType<"uint256", unknown>;
}[]
export async function getAllFunders(from:string) {
	const contract = getContract(from);
	try {
		const funders = await contract.methods.getAllFunders().call()

        return funders
	} catch (error) {
		console.error(error);
		throw new Error("Error in fetching funders ");
	}
}
