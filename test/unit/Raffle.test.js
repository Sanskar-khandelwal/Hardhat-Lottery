const { getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")
const { assert, expect } = require("chai")
!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Raffle Unit Tests", async function () {
      let raffle, vrfCoordinatorV2Mock, raffleEntranceFee, deployer
      const chainId = network.config.chainId
      beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        raffle = await ethers.getContract("Raffle", deployer)
        vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock", deployer)
        raffleEntranceFee = await raffle.getEntranceFee()
      })

      describe("constructor", async function () {
        it("initializes the raffle correctly", async function () {
          //Ideally we make our tests have just 1 assersts per "it"

          const raffleState = await raffle.getRaffleState()
          const interval = await raffle.getInterval()
          assert.equal(raffleState.toString(), "0")

          assert.equal(interval.toString(), networkConfig[chainId]["interval"])
        })
      })

      describe("enterRaffle", async function () {
        it("reverts when you don't enought", async function () {
          await expect(raffle.enterRaffle()).to.be.revertedWith("Raffle__NotEnoughtEthEntered")
        })

        it("records players when they enter", async function () {
          await raffle.enterRaffle({ value: raffleEntranceFee })
          const playerFromContract = await raffle.getPlayer(0)
          assert.equal(playerFromContract, deployer)
        })

        it("emits event on enter", async function () {
          await expect(raffle.enterRaffle({ value: raffleEntranceFee })).to.emit(
            raffle,
            "RaffleEnter"
          )
        })
      })
    })