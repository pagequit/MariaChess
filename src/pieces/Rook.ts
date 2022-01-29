import Board from "../Board";
import Piece from "../Piece";
import SimpleMoves from "../interfaces/SimpleMoves";

export default class Rook {
	static GetDirections(square: number): Array<{ dir: number, abs: number }> {
		return [
			{
				dir: -8,
				abs: Math.abs(Board.getOffsetTop(square)),
			},
			{
				dir: -1,
				abs: Math.abs(Board.getOffsetLeft(square)),
			},
			{
				dir: 1,
				abs: Board.getOffsetRight(square),
			},
			{
				dir: 8,
				abs: Board.getOffsetBottom(square),
			},
		];
	}

	static GetSimpleMoves(board: Board, square: number): SimpleMoves[] {
		return Rook.GetCoveringSquares(board, square).filter(s => {
			return Piece.GetColor(board.squares[s]) !== board.activeColor
		}).map(s => {
			return { from: square, to: s };
		});
	}

	static GetCoveringSquares(board: Board, square: number): number[] {
		const targets: number[] = [];
		const directions = Rook.GetDirections(square);

		const dirLength = directions.length;
		for (var i = 0; i < dirLength; i++) {
			for (var j = 0; j < directions[i].abs; j++) {
				const targetSquare = square + directions[i].dir * (j + 1);
				targets.push(targetSquare);

				if (board.squares[targetSquare]
					|| Piece.GetColor(board.squares[targetSquare]) === board.activeColor
				) {
					break;
				}
			}
		}

		return targets;
	}
}
