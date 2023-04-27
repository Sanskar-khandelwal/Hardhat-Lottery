# Raffle Smart Contract

`This is a Solidity smart contract for a completely automated raffle. The contract allows participants to enter the raffle by paying an entrance fee, and then randomly selects a winner every X minute.`

The contract utilizes Chainlink oracle for the randomness of the winner selection process. It also uses Chainlink Keepers for automated execution.

---

## Functionality

The Raffle contract provides the following functionalities:

### enterRaffle(): allows participants to enter the raffle by paying the entrance fee.

### requestRandomWinner(): requests Chainlink oracle to pick a random winner.

### fulfillRandomWords(): fulfills the random words request from the Chainlink oracle and picks a winner based on the random number generated.

### getEntranceFee(): returns the entrance fee required to enter the raffle.

### getPlayer(): returns the address of the participant at a particular index.

### getRecentWinner(): returns the address of the most recent winner.

---

## Chainlink Oracle

This contract utilizes Chainlink oracle for generating the random number required for selecting the winner. The requestRandomWinner() function sends a request to the oracle to generate a random number, and fulfillRandomWords() function receives the generated random number and picks the winner based on the number.

---

## Keepers

The contract is completely automated and does not require any external intervention to select a winner. It utilizes Chainlink Keepers to automate the process of selecting the winner every X minute.
