import Web3 from "web3";

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