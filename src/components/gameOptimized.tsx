import { useState, useCallback, memo } from "react";

const Square = memo(({ value, onClick }: { value: string | null; onClick: () => void }) => {
	return (
		<button
			className="w-16 h-16 text-xl border flex items-center justify-center bg-gray-100 hover:bg-gray-200"
			onClick={onClick}
		>
			{value}
		</button>
	);
});

const TicTacToe: React.FC = () => {
	const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
	const [isXNext, setIsXNext] = useState<boolean>(true);

	const checkWinner = useCallback((board: (string | null)[]): string | null => {
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
	}, []);

	const winner = checkWinner(board);

	const handleClick = useCallback((index: number): void => {
		if (board[index] || winner) return;
		const newBoard = [...board];
		newBoard[index] = isXNext ? "X" : "O";
		setBoard(newBoard);
		setIsXNext(!isXNext);
	}, [board, isXNext, winner]);

	const resetGame = useCallback((): void => {
		setBoard(Array(9).fill(null));
		setIsXNext(true);
	}, []);

	return (
		<div className="flex flex-col items-center p-4">
			<h1 className="text-2xl font-bold mb-4">Tic-Tac-Toe</h1>
			<div className="grid grid-cols-3 gap-2">
				{board.map((cell, index) => (
					<Square key={index} value={cell} onClick={() => handleClick(index)} />
				))}
			</div>
			{winner && <p className="mt-4 text-lg font-bold">Winner: {winner}</p>}
			<button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={resetGame}>Reset Game</button>
		</div>
	);
};

export default TicTacToe;
