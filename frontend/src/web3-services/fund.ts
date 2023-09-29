import Web3 from "web3";
import { getContract } from "./web3Config";


export async function fund(amount:string,from:string){
    const contract = getContract(from)
    try {
        const transaction = await contract.methods.fund().send({from:from,value:Web3.utils.toWei(amount,"wei")})
        return transaction
    } catch (error) {
        console.error(error)
        throw new Error("Error in funding")
    }

}