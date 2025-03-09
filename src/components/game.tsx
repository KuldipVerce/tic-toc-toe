import { useState } from "react";

/**
	 * Description: Tic-Tac-Toe is a classic two-player game built using ReactJS ⚛. 
	 * The game allows players to take turns placing "X" and "O" on a 3x3 grid. 
	 * The objective is to get three of the same marks in a row, column, or diagonal.
 * 
 * Features:
 * - Simple and intuitive UI
 * - Dynamic turn-based gameplay
 * - Detects winning conditions
 * - Displays winner or draw message
 * - Reset functionality to start a new game
 * - Mobile Responsive
 * 
 * Tools & Technologies:
 * - React ⚛
 * - Tailwind CSS 🎨
 * - React Hooks 🔄
 */

const TicTacToe: React.FC = () => {
	const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
	const [isXNext, setIsXNext] = useState<boolean>(true);

	const checkWinner = (board: (string | null)[]): string | null => {
		const winningCombinations = [
			[0, 1, 2], [3, 4, 5], [6, 7, 8],
			[0, 3, 6], [1, 4, 7], [2, 5, 8],
			[0, 4, 8], [2, 4, 6]
		];
		for (const combo of winningCombinations) {
			const [a, b, c] = combo;
			if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				return board[a];
			}
		}
		return null;
	};

	const winner = checkWinner(board);
	const handleClick = (index: number): void => {
		//console.log(board);
		if (board[index] || winner) return;
		const newBoard = [...board];
		newBoard[index] = isXNext ? "X" : "O";
		setBoard(newBoard);
		setIsXNext(!isXNext);
		//console.log("dddd: ", board);
	};

	// Runs whenever `board` changes
	// useEffect(() => {
	// 	console.log("Updated board:", board);
	// }, [board]); 

	const resetGame = (): void => {
		setBoard(Array(9).fill(null));
		setIsXNext(true);
	};

	return (
		<div className="flex bg-black flex-col items-center p-4">
			<h1 className="text-2xl text-white font-bold mb-4">Tic-Tac-Toe</h1>
			<div className="grid grid-cols-3 gap-2">
				{board.map((cell, index) => (
					<button
						key={index}
						className="w-16 h-16 text-xl border flex items-center justify-center bg-gray-100 hover:bg-gray-200"
						onClick={() => handleClick(index)}
					>
						{cell}
					</button>
				))}
			</div>
			{winner && <p className="mt-4 text-white text-lg font-bold">Winner: {winner}</p>}
			<button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={resetGame}>Reset Game</button>
		</div>
	);
};

export default TicTacToe;