import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv"
dotenv.config()
const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks:{
    fantomTestnet:{
      url:process.env.FANTOM_TESTNET_RPC_URL,
      chainId:4002,
      accounts:{
        mnemonic:process.env.MNEMONIC || ""
      }
    }
  }
};

export default config;
