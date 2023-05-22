const { developmentChains } = require("../helper-hardhat-config")
module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    if (developmentChains.includes(network.name)) {
        log("Local Network Detected, Deploying Mocks")
        //deploy a mock vrfCordinator
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
        })
    }
}
