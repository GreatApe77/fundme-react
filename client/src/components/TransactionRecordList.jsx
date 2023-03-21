import { useState } from "react";
import { getAllFunds } from "../Web3Functions";
import GenericButton from "./GenericButton";
import Transaction from "./Transaction";
import Web3 from "web3";
function TransactionRecordList() {
	const [transations,setTransactions] = useState([])
	async function viewTransactionsOnCLick() {
		const allfunds = await getAllFunds();
		setTransactions(allfunds)
	}

	return (
		<div className="container">
			<GenericButton execute={viewTransactionsOnCLick} content="View all funds" />
			<div className="TransactionRecordList">
			{
				transations.map((transactions,index)=>(
					<Transaction key={index}
					funder={transactions.addressOfFunder}
					amount={Web3.utils.fromWei(transactions.amountFunded)}
					/>
				))
			}
			</div>

		</div>
	);
}

export default TransactionRecordList;
