//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

contract Game1 {

	// address public immutable owner;
	uint public betAmount;
	uint256 public soldi;

	struct Player {
		uint256  num;
		address player;
		int win;
	}

	mapping (bytes32 => Player[]) public players; // object of sessionsId as key and players array as value

	constructor() {
		// owner = msg.sender;
		betAmount = 30000000000000000;
	}

	function payPlayer(address player) private{
		address payable p = payable(player);
		p.transfer(10000000000000000); //0.01 ether
	}

	function getBalance() public returns (uint) {
		soldi = address(this).balance;
		return address(this).balance;
	}

    function newGame(bytes32 sessionId, uint num) public payable returns(int) {

		// require(msg.value > betAmount);
		getBalance();
		Player[] storage sessionPlayers = players[sessionId];

		if(sessionPlayers.length < 2) // if less than 2 players are in the session add the player
		{
			sessionPlayers.push(Player({ // add player
				player: msg.sender,
				num: num,
				win: 0
			}));
		}

		if(sessionPlayers.length == 2) // if 2 players are in the session
		{
			if (sessionPlayers[0].num == sessionPlayers[1].num) //player 2 win
			{
				sessionPlayers[0].win = -1;
				sessionPlayers[1].win = 1;
				// payPlayer(sessionPlayers[1].player); // pay player 2 //!VA SBLOCCATA
				console.log(1);
				delete players[sessionId]; // delete session
				return (1);
			}
			else if (sessionPlayers[0].num != sessionPlayers[1].num) // player 1 win
			{
				sessionPlayers[0].win = 1;
				sessionPlayers[1].win = -1;
				// payPlayer(sessionPlayers[0].player); // pay palyer 1 //!VA SBLOCCATA
				console.log(2);
				delete players[sessionId]; // delete session
				return (-1);
			}
		}

        console.log(0);
		return (0);
	}

}
