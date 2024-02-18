//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

contract Game1 {

	address public immutable owner;
	uint public betAmount;
	uint256 public soldi;

	struct Player {
		uint256  num;
		address player;
		int win;
	}

	struct Session {
		uint bet;
		Player[] players;
	}

	struct SessReturn {
		bool exists;
		uint bet;
	}


	mapping (bytes32 => Session) public sessions; // object of sessionsId as key and sessions array as value

	constructor(address _owner) {
		owner = _owner;
		betAmount = 30000000000000000; //0.03 ether
	}

	function payPlayer(address player, uint price, uint tax) private{
		address payable p = payable(player);
		address payable ownerPayable = payable(owner);
		p.transfer(price);
		ownerPayable.transfer(tax);
	}

	function findSession(bytes32 sessionId) public view returns (SessReturn memory) {
		SessReturn memory sess = SessReturn(false, 0);
		if(sessions[sessionId].players.length != 0)
		{
			sess.exists = true;
			sess.bet = sessions[sessionId].bet / 2;
		}
		return sess;
	}

	function getBetValue(bytes32 sessionId) public view returns (uint) {
		return sessions[sessionId].bet;
	}

	function getResult(bytes32 sessionId, address player) public view returns (int) {
		Player[] storage players = sessions[sessionId].players;
		for (uint i = 0; i < players.length; i++)
		{
			if (players[i].player == player)
				return players[i].win;
		}
		return 0;
	}

    function newGame(bytes32 sessionId, uint num) public payable returns(int) {

		require(msg.value  > betAmount, "Not enough money to play");
		Player[] storage players = sessions[sessionId].players;

		if(players.length < 2) // if less than 2 players are in the players add the player
		{
			if (players.length == 0)
				sessions[sessionId].bet = msg.value;
			players.push(Player({ // add player
				player: msg.sender,
				num: num,
				win: 0
			}));
		}

		if(players.length == 2) // if 2 players are in the players
		{
			uint tot = sessions[sessionId].bet + msg.value;
			uint tax = tot * 20 / 100;
			if (players[0].num == players[1].num) //player 2 win
			{
				players[0].win = 2;
				players[1].win = 1;
				payPlayer(players[1].player, (tot - tax), tax); // pay player 2 //!VA SBLOCCATA
				console.log(1);
				// delete sessions[sessionId]; // delete session
				return (1);
			}
			else if (players[0].num != players[1].num) // player 1 win
			{
				players[0].win = 1;
				players[1].win = 2;
				payPlayer(players[0].player, (tot - tax), tax); // pay palyer 1 //!VA SBLOCCATA
				console.log(2);
				// delete sessions[sessionId]; // delete session
				return (-1);
			}
		}

        console.log(0);
		return (0);
	}

}
