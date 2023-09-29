
import { getContract } from "./web3Config";


export async function getTotalBalance(from:string) {
	const contract = getContract(from);
	try {
		const totalBalance = await contract.methods.getContractBalance().call()

        return totalBalance
	} catch (error) {
		console.error(error);
		throw new Error("Error in fetching total balance");
	}
}
