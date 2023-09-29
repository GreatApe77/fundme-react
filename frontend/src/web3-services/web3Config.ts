import Web3 from "web3"
import { ABI, FUND_ME_ADDRESS } from "./contractData"
export function getWeb3(){
    if(!window.ethereum){
        throw new Error("No metamask found!")
    }
    return new Web3(window.ethereum)
}
export  function getContract(account:string){
    const web3 = getWeb3()
    console.log(FUND_ME_ADDRESS)
    return new web3.eth.Contract(ABI,FUND_ME_ADDRESS,{from:account})
}