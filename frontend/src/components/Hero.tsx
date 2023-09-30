import { ConnectWallet } from "@thirdweb-dev/react";

export default function Hero() {
	return (
		<div className="container col-xxl-8 px-4 py-5 ">
			<div className="row flex-lg-row-reverse align-items-center g-5 py-5">
				<div className="col-10 col-sm-8 col-lg-6">
					<img
						src="https://www.svgrepo.com/show/411846/contribute.svg"
						className="d-block mx-lg-auto img-fluid"
						alt="Bootstrap Themes"
						width="700"
						height="500"
						loading="lazy"
					/>
				</div>
				<div className="col-lg-6">
					<h1 className="display-5 fw-bold lh-1 mb-3">
						Preciso de Ether! Campanha de Doação de Ether
					</h1>
					<p className="lead">
						Projeto Simples de Fund me que usa React para interagir com um smart contract
					</p>
					<div className="d-grid gap-2 d-md-flex justify-content-md-start">
                    <ConnectWallet theme={"dark"} btnTitle="Conectar Carteira" switchToActiveChain={true}/>
					</div>
				</div>
			</div>
		</div>
	);
}
