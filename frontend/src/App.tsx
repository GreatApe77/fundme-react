import {  useAddress } from "@thirdweb-dev/react";
import Header from "./components/Header";

import Hero from "./components/Hero";
import FundMeForm from "./components/FundMeForm";

function App() {
	const account =useAddress()
	return (
		<div>
			<Header />
			<div>
				{account?(
					<FundMeForm totalDonatedEth="4.5"/>
				):(
					<Hero />

				)

				}
			</div>
		</div>
	);
}

export default App;
