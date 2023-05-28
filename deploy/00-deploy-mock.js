const { ethers } = require("ethers")

const { developmentChains } = require("../helper-hardhat-config") //0.25 is the premium. It cost .25 link per request

const BASE_FEE = ethers.utils.parseEther("0.25") // .25 is the premium. It cost .25 link
const GAS_PRICE_LINK = 1e9

//calculated value based on the gas price of the chain.
module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const args = [BASE_FEE, GAS_PRICE_LINK]
    const chainId = network.config.chainId

    if (developmentChains.includes(network.name)) {
        log("Local Network Detected, Deploying Mocks")
        //deploy a mock vrfCordinator
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        })
        log("MOCKS DEPLOYED!")
        log("----------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
