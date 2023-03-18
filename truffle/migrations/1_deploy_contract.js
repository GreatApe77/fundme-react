const SimpleStorage = artifacts.require("SimpleStorage")

module.exports = async (deployer,network,accounts)=>{
  await deployer.deploy(SimpleStorage)
}