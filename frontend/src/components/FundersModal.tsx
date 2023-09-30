import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function FundersModal(props: any) {
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Contribuidores
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{props.funders?.length? (
					props.funders.map((funder:any,key:any) => (
						<div key={key}>
							<hr />
							<p>{funder.funderAddress}</p>
							<small>{(Number(funder.amountFunded)/10**18).toFixed(2)} ETH</small>
							<hr />
						</div>
					))
				) : (
					<></>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Fechar</Button>
			</Modal.Footer>
		</Modal>
	);
}
