import { useState } from "react";
import { getAllFunds } from "../Web3Functions";
import GenericButton from "./GenericButton";
import Transaction from "./Transaction";
import Web3 from "web3";
function TransactionRecordList() {
	const [funder, setFunder] = useState("0x0000000000000000000000000000000000000000");
	const [amount, setAmount] = useState("0.0");
	async function viewTransactionsOnCLick() {
		const allfunds = await getAllFunds();
        setAmount(Web3.utils.fromWei(allfunds[0].amountFunded))
        setFunder(allfunds[0].addressOfFunder)
	}

	return (
		<div className="TransactionRecordList">
			<GenericButton execute={viewTransactionsOnCLick} content="View all funds" />
			<Transaction
				amount={amount}
				funder={funder}
			/>
		</div>
	);
}

export default TransactionRecordList;
