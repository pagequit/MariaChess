import Board from "../Board";
import Piece from "../Piece";
import SimpleMoves from "../interfaces/SimpleMoves";

export default class Knight {
	static Squares: Array<number> = [17, 15, 10, 6];
	static Calc: any = {
		0: (a: number, b: number) => a + b,
		1: (a: number, b: number) => a - b,
	}

	static GetSign(board: Board) {
		return board.activeColor === Piece.White ? '-' : '+';
	}

	static GetSimpleMoves(board: Board, square: number): Array<SimpleMoves> {
		let targets: Array<SimpleMoves> = [];

		const coveredSquares: Array<number> = Knight.GetCoveringSquares(board, square);

		const coveredSquaresLength = coveredSquares.length;
		for (var i = 0; i < coveredSquaresLength; i++) {
			targets.push({ from: square, to: coveredSquares[i] });
		}

		targets = targets.filter(({ to }) => {
			return Piece.GetColor(board.squares[to]) !== board.activeColor;
		});

		return targets;
	}

	static GetCoveringSquares(board: Board, square: number): Array<number> {
		let targets: Array<number> = [];

		for (var sign = 0; sign < 2; sign++) {
			for (var i = 0; i < 4; i++) {
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
