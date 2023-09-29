import { ConnectWallet } from "@thirdweb-dev/react";

export default function Header() {
	return (
		<header >
			<div className="px-3 py-2 bg-dark text-white">
				<div className="container">
					<div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
						<a
							href="/"
							className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
						>
							<img
								className="bi me-2"
								width="70"
								
								role="img"
								aria-label="Bootstrap"
								src="https://www.svgrepo.com/show/138401/wallet.svg"
							/>

							<h3>Fund Me!</h3>	
							
						</a>

						<ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
							{/*<li>
								<a href="#" className="nav-link text-secondary">
									<img className="bi d-block mx-auto mb-1" width="24" height="24"/>
										<use  />
									
									Home
								</a>
							</li>
							<li>
								<a href="#" className="nav-link text-white">
								<img className="bi d-block mx-auto mb-1" width="24" height="24"/>
										<use  />
									
									Home
								</a>
							</li>
							<li>
								<a href="#" className="nav-link text-white">
								<img className="bi d-block mx-auto mb-1" width="24" height="24"/>
										<use  />
									
									Home
								</a>
							</li>
							<li>
								<a href="#" className="nav-link text-white">
								<img className="bi d-block mx-auto mb-1" width="24" height="24"/>
										<use  />
									
									Home
								</a>
							</li>*/}
							<li>
								<ConnectWallet theme={"dark"} btnTitle="Conectar Carteira" switchToActiveChain={true}/>
							</li>
						</ul>
					</div>
				</div>
			</div>
			
		</header>
	);
}
