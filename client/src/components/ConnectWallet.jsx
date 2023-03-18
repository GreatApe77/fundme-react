
import { useState } from "react";
import { connectWallet } from "../Web3Functions";

function ConnectWallet(){

    const [first, setfirst] = useState("ConnectWallet")
    async function connectWalletOnClick(){
        const connectedAccount = await connectWallet()
        setfirst(connectedAccount)
    }


    return(
        <button onClick={connectWalletOnClick}>
            {first}
        </button>
    )
}


export default ConnectWallet