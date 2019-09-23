import React, { useState } from "react";
import './tick-tack-toe-component.css';

function TickTackToe() {

	let [tickTackToe, setTickTackToe] = useState([null,null,null,null,null,null,null,null,null]);
	
	const players = ["Player One", "Player Two"];
	const [activePlayer, setActivePlayer] = useState(players[0]);
	const [winner, setWinner] = useState(null);
	const [winSequence, setWinSequence] = useState([]);
	const [gameFinished, setGameFinished] = useState(false);

	const renderSign = (e) => {
		let idx = e.target.getAttribute('value')

		if (tickTackToe[idx]) {
			return;
		};

		tickTackToe[idx] = activePlayer;
		setTickTackToe(tickTackToe)
		calculateWin(players[0]);
		calculateWin(players[1]);
		nextPlayer()

		console.log(tickTackToe.indexOf(null))
		if (tickTackToe.indexOf(null) === -1) {
			setGameFinished(true);
		}
	}

	const winTable = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6]
	]

	const winChecker = (arr, target) => target.every(v => arr.includes(v));

	const calculateWin = (player) => {
		let playerOneIndexes = tickTackToe.reduce(function(array, field, i) {
		    if (field === player)
		        array.push(i);
		    return array;
		}, []);

		for (var i = 0; i < winTable.length; i++) {
			let hasWon = winChecker(playerOneIndexes, winTable[i])
			if (hasWon) {
				setWinSequence(winTable[i])
				setWinner(player)
				setGameFinished(true);
				return true;
			};
		};

		return false

	}

	const nextPlayer = () => {
		if (activePlayer === players[0]) {
			setActivePlayer(players[1])
		} else {
			setActivePlayer(players[0])
		}
	}

	const replay = () => {
		setWinner(null);
		setWinSequence([]);
		setGameFinished(false);
		setTickTackToe([null,null,null,null,null,null,null,null,null])
	}

  	return (
	    <div className="tick-tack-toe">
	        <h2>
	        	Tick Tack Toe
	        </h2>

	        <h4>
	        	{winner !== null ? "Winner: " + winner : "Active Player: " + activePlayer} 
	        </h4>

	        <div className="game">
	        	{gameFinished === true ? <div onClick={replay} className="game-replay"><span>Replay?</span></div> : ""}
		        {tickTackToe.map((field, idx) => (
	            	<div 
	            		onClick={renderSign}
	            		className={`game-field ${field !== null ? 'disabled' : ''} ${winSequence.indexOf(idx) !== -1 ? 'field-green' : ''}`}
	            		key={idx} 
	            		value={idx}
	            	>
	            		{field === players[0] ? "O" : field === players[1] ? "X" : ""}
	            	</div>
	          	))}
	        </div>

	    </div>
  	);
}

export default TickTackToe;
