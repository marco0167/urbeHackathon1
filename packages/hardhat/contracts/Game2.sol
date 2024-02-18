//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

contract Game2 {

	// address public immutable owner;
	uint256 public soldi;
	address private owner;

	struct Player {
		uint256[]  nums;
		address player;
		uint256 score;
		uint256 winAmount;
	}

	struct Session {
		Player[] players;
		uint256 betPlayer1;
		uint256 betPlayer2;
		uint256[] correctNums;
	}

	mapping (bytes32 => Session) public sessions; // object of sessionsId as key and session array as value

	constructor() {
		owner = msg.sender;
	}

	function payPlayer(address player, uint256 ammount) private{
		address payable p = payable(player);
		p.transfer(ammount); //0.01 ether
	}

	function getBalance() public returns (uint) {
		soldi = address(this).balance;
		return address(this).balance;
	}

	function getBetAmountPlayer(bytes32 sessionId, uint256 id) public view returns (uint) {
		if (id == 1)
			return sessions[sessionId].betPlayer1;
		else
			return sessions[sessionId].betPlayer2;
	}

	function getBetTotal(bytes32 sessionId) public view returns (uint) {
		return sessions[sessionId].betPlayer1 + sessions[sessionId].betPlayer2;
	}

    function newGame(bytes32 sessionId, uint[] calldata nums, uint256 range) public payable returns(uint256) {

		// require(msg.value > betAmount);
		getBalance();
		Session storage session = sessions[sessionId];

		if(session.players.length < 2) // if less than 2 players are in the session add the player
		{
			if (session.players.length == 0)
			{
				session.betPlayer1 = msg.value;
				uint256 ratio = uint256(nums.length) * 1e10 / range;
        		session.betPlayer2 = session.betPlayer1 * ratio / 1e10;
			}
			else
				require(msg.value == session.betPlayer2, "Bet amount is not correct");
				session.players.push(Player({ // add player
				player: msg.sender,
				nums: nums,
				score: 0,
				winAmount: 0
			}));
		}
		if(session.players.length == 2) // if 2 players are in the session
		{
			for (uint i = 0; i < session.players[0].nums.length; i++)
			{
				if (session.players[0].nums[i] == session.players[1].nums[i])
				{
					session.correctNums.push(session.players[0].nums[i]);
					session.players[1].score++;
				}
			}
			// Calculate the winnings based on the score
			uint256 totalBet = session.betPlayer1 + session.betPlayer2;
			uint256 winnings = totalBet * session.players[1].score / session.players[0].nums.length;

			// Subtract the commission for the contract creator
			uint256 commission = winnings / 20; // 5% commission
			session.players[1].winAmount = winnings - commission;

			// Pay the player
			payPlayer(session.players[1].player, session.players[1].winAmount);

			// Calculate the remaining amount and pay it to player 0
			uint256 remaining = totalBet - winnings - commission;
			commission = remaining / 20; // 5% commission
			session.players[0].winAmount = remaining - commission;
			payPlayer(session.players[0].player, session.players[0].winAmount);
			payPlayer(owner, commission);

			return (session.players[1].score);
		}
		return (0);
	}

	function deleteGame(bytes32 sessionId) public {
		require(msg.sender == owner, "Only the owner can delete the game");
		delete sessions[sessionId];
	}

	function getWinAmount(bytes32 sessionId, uint256 id) public view returns (uint) {
		return sessions[sessionId].players[id].winAmount;
	}

	function getCorrectNums(bytes32 sessionId) public view returns (uint[] memory) {
		return sessions[sessionId].correctNums;
	}
}
