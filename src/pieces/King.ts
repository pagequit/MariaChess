import Board from '../Board';
import Piece from '../Piece';
import SimpleMoves from '../interfaces/SimpleMoves';

export default class Queen {
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

	static GetSimpleMoves(board: Board, square: number): SimpleMoves[] {
		return Queen.GetCoveringSquares(board, square).filter(s => {
			return Piece.GetColor(board.squares[s]) !== board.activeColor;
		}).map(s => {
			return { from: square, to: s };
		});
	}

	static GetCoveringSquares(board: Board, square: number): number[] {
		const targets: number[] = [];
		const directions = Queen.GetDirections(square);

		const dirLength = directions.length;
		for (let i = 0; i < dirLength; i++) {
			for (let j = 0; j < directions[i].abs; j++) {
				targets.push(square + directions[i].dir * (j + 1));
				break;
			}
		}

		return targets;
	}
}
