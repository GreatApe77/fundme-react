
import { useState } from "react";
import { connectWallet } from "../Web3Functions";

function ConnectWallet(){

    const [first, setfirst] = useState("Connect Wallet")
    async function connectWalletOnClick(){
        const connectedAccount = await connectWallet()
        
        setfirst(connectedAccount)
    }


    return(
        <button className="ConnectWallet" onClick={connectWalletOnClick}>
            {first}
        </button>
    )
}


export default ConnectWallet