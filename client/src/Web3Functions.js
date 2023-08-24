import Web3 from "web3";
import FUND_ME_DATA from "./build/contracts/FundMe.json"
const FUND_ME_ABi = FUND_ME_DATA.abi
const FUND_ME_ADDRESS = FUND_ME_DATA.networks["1692845776848"].address
const noMetamaskMsg =
	"<h1>No Metamask Found! Please Install the metamask extension on your browser</h1>";

async function getWeb3() {
	if (window.ethereum !== undefined) {
		try {
			const web3 = new Web3(window.ethereum);

			return web3;
		} catch (error) {
			console.error(error);
		}
	} else {
		document.writeln(noMetamaskMsg);
	}
}


export async function connectWallet(){
    const web3 = await getWeb3()
    const accounts = await web3.eth.requestAccounts()
    return accounts[0]
}


export async function fund(amount){
	const web3 = await getWeb3()
	const msgSender = await connectWallet()
	const fundMeContract = new web3.eth.Contract(FUND_ME_ABi,FUND_ME_ADDRESS)	
	const tx = await fundMeContract.methods.fund().send({from:msgSender,value:web3.utils.toWei(amount)})
	return tx
}

export async function getAllFunds(){
	const web3 = await getWeb3()
	const msgSender = await connectWallet()
	const fundMeContract = new web3.eth.Contract(FUND_ME_ABi,FUND_ME_ADDRESS)	
	const readCall = await fundMeContract.methods.getAllFunds().call({from:msgSender})
	return readCall	
}