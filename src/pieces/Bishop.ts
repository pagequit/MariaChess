import Board from "../Board";
import Piece from "../Piece";
import SimpleMoves from "../interfaces/SimpleMoves";

export default class Bishop {
	static GetDirections(square: number): Array<any> {
		return [
			{
				dir: -9,
				abs: Math.min(
					Math.abs(Board.getOffsetLeft(square)),
					Math.abs(Board.getOffsetTop(square))
				),
			},
			{
				dir: -7,
				abs: Math.min(
					Math.abs(Board.getOffsetTop(square)),
					Board.getOffsetRight(square)
				),
			},
			{
				dir: 7,
				abs: Math.min(
					Math.abs(Board.getOffsetLeft(square)),
					Board.getOffsetBottom(square)
				),
			},
			{
				dir: 9,
				abs: Math.min(
					Board.getOffsetBottom(square),
					Board.getOffsetRight(square)
				),
			},
		];
	}

	static GetSimpleMoves(board: Board, square: number): Array<SimpleMoves> {
		return Bishop.GetCoveringSquares(board, square).filter(s => {
			return Piece.GetColor(board.squares[s]) !== board.activeColor
		}).map(s => {
			return { from: square, to: s };
		});
	}

	static GetCoveringSquares(board: Board, square: number): Array<number> {
		const targets: Array<number> = [];
		const directions = Bishop.GetDirections(square);

		const dirLength = directions.length;
		for (var i = 0; i < dirLength; i++) {
			for (var j = 0; j < directions[i].abs; j++) {
				const targetSquare = square + directions[i].dir * (j + 1);
				targets.push(targetSquare);

				if (board.squares[targetSquare] !== null) { // TODO: 2. Think about this
					break;
				}
			}
		}

		return targets;
	}
}
