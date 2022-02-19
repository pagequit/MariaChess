import Board from '../Board';
import Piece from '../Piece';
import SimpleMoves from '../interfaces/SimpleMoves';

export default class Knight {
	static Squares = [17, 15, 10, 6];
	static Calc = [
		(a: number, b: number): number => a + b,
		(a: number, b: number): number => a - b,
	];

	static GetSimpleMoves(board: Board, square: number): SimpleMoves[] {
		let targets: SimpleMoves[] = [];

		const coveredSquares = Knight.GetCoveringSquares(board, square);

		const coveredSquaresLength = coveredSquares.length;
		for (let i = 0; i < coveredSquaresLength; i++) {
			targets.push({ from: square, to: coveredSquares[i] });
		}

		targets = targets.filter(({ to }) => {
			return Piece.GetColor(board.squares[to]) !== board.activeColor;
		});

		return targets;
	}

	static GetCoveringSquares(board: Board, square: number): number[] {
		let targets: number[] = [];

		for (let sign = 0; sign < 2; sign++) {
			for (let i = 0; i < 4; i++) {
				targets.push(Knight.Calc[sign](square, Knight.Squares[i]));
			}
		}

		targets = targets.filter(targetSquare => {
			return board.squares[targetSquare] !== undefined
				&& Math.abs(Board.getOffsetLeft(square) - Board.getOffsetLeft(targetSquare)) < 3;
		});

		return targets;
	}
}
