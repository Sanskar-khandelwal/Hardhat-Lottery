// Raffle 
//Enter the lottery (paying some amount)

// Pick a random winner(paying some amount)

// winner to be selected every X minute -> completely autmoated

//chainlink oracle -> Randomness, Automated Execution (chainlink Keepers )


//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol"

error Raffle__NotEnoughtEthEntered();

contract Raffle is VRFConsumerBaseV2{
    /* State Variables */
    uint256 private immutable i_entranceFee;
    address payable[] private s_players;
    VRFCoordinatorV2Interface private immutable i_vrfCoordinator;

    /*Events */
    event RaffleEnter(address indexed player);
  
  constructor(address vrfCoorinatorV2,uint256 entranceFee) VRFConsumerBaseV2(vrfCoorinatorV2){
    i_entranceFee = entranceFee;
    i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoorinatorV2)
  }
  function enterRaffle() public payable {
    if(msg.value < i_entranceFee){
        revert Raffle__NotEnoughtEthEntered();
    }
    s_players.push(payable(msg.sender));
    emit RaffleEnter(msg.sender);

  }

    
  function requestRandomWinner() external {
    
 i_vrfCoordinator.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords)
  }

  function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {

  }


/* view pure function */
function getEntranceFee() public view returns(uint256){
    return i_entranceFee;
}

function getPlayer(uint256 index) public view returns(address){
    return s_players[index];
} 
} 