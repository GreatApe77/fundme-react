function Transaction(props) {
	return (
		<div className="Transaction">
			<p>Funder:</p>
			<p>{props.funder}</p>
			<p>Amount:</p>
			<p>
				{props.amount}
				<img
					className="coinSymbol"
					src="https://www.svgrepo.com/show/443042/brand-ethereum.svg"
					alt="ethSymbol"
				/>
			</p>
		</div>
	);
}

export default Transaction;
