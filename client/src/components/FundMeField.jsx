import GenericButton from "./GenericButton"
import { fund } from "../Web3Functions";
function FundMeField(){


    async function fundOnClick(){
        const tx = await fund(document.getElementById("amountToFund").value)
        console.log(tx)
    }

    return (
        <div className="FundMeField">
            <input placeholder="amount (ETH)" type="number" className="FundMeInput" id="amountToFund" />
            <GenericButton execute={fundOnClick} content="Fund me here!" />
        </div>
    )
}

export default FundMeField


