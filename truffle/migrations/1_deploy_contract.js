const FundMe = artifacts.require("FundMe")

module.exports = async (deployer,network,accounts)=>{
  await deployer.deploy(FundMe)
}