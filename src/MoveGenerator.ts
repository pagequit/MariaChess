import Board from './Board';
import Piece from './Piece';
import Move from './Move';
import SimpleMoves from './interfaces/SimpleMoves';

import Pawn from './pieces/Pawn';
import Knight from './pieces/Knight';
import Bishop from './pieces/Bishop';
import Rook from './pieces/Rook';
import Queen from './pieces/Queen';

export default class MoveGenerator {
	board: Board;
	classMap: any;

	constructor(board: Board) {
		this.board = board;
		this.classMap = {
			[Piece.Pawn]: Pawn,
			[Piece.Knight]: Knight,
			[Piece.Bishop]: Bishop,
			[Piece.Rook]: Rook,
			[Piece.Queen]: Queen,
		}
	// 		// --- King ---
	// 		[6]: (square: number): Array<SimpleMoves> => {
	// 			const targets: Array<SimpleMoves> = [];
	// 			const directions: Array<any> = [
	// 				{
	// 					dir: -8,
	// 					abs: Math.abs(Board.getOffsetTop(square)),
	// 				},
	// 				{
	// 					dir: -1,
	// 					abs: Math.abs(Board.getOffsetLeft(square)),
	// 				},
	// 				{
	// 					dir: 1,
	// 					abs: Board.getOffsetRight(square),
	// 				},
	// 				{
	// 					dir: 8,
	// 					abs: Board.getOffsetBottom(square),
	// 				},
	// 				{
	// 					dir: -9,
	// 					abs: Math.min(
	// 						Math.abs(Board.getOffsetLeft(square)),
	// 						Math.abs(Board.getOffsetTop(square))
	// 					),
	// 				},
	// 				{
	// 					dir: -7,
	// 					abs: Math.min(
	// 						Math.abs(Board.getOffsetTop(square)),
	// 						Board.getOffsetRight(square)
	// 					),
	// 				},
	// 				{
	// 					dir: 7,
	// 					abs: Math.min(
	// 						Math.abs(Board.getOffsetLeft(square)),
	// 						Board.getOffsetBottom(square)
	// 					),
	// 				},
	// 				{
	// 					dir: 9,
	// 					abs: Math.min(
	// 						Board.getOffsetBottom(square),
	// 						Board.getOffsetRight(square)
	// 					),
	// 				},
	// 			];

	// 			const dirLength = directions.length;
	// 			for (var i = 0; i < dirLength; i++) {
	// 				for (var j = 0; j < directions[i].abs; j++) {
	// 					const targetSquare = square + directions[i].dir * (j + 1);
	// 					if (Piece.GetColor(this.board.squares[targetSquare]) === this.board.activeColor) {
	// 						break;
	// 					}

	// 					targets.push({ from: square, to: targetSquare });
	// 					break;
	// 				}
	// 			}

	// 			return targets;
	// 		},
	// 	};
	// 			// --- King ---
	// 			[6]: (square: number): Array<SimpleMoves> => {
	// 				const targets: Array<SimpleMoves> = [];
	// 				const directions: Array<any> = [
	// 					{
	// 						dir: -8,
	// 						abs: Math.abs(Board.getOffsetTop(square)),
	// 					},
	// 					{
	// 						dir: -1,
	// 						abs: Math.abs(Board.getOffsetLeft(square)),
	// 					},
	// 					{
	// 						dir: 1,
	// 						abs: Board.getOffsetRight(square),
	// 					},
	// 					{
	// 						dir: 8,
	// 						abs: Board.getOffsetBottom(square),
	// 					},
	// 					{
	// 						dir: -9,
	// 						abs: Math.min(
	// 							Math.abs(Board.getOffsetLeft(square)),
	// 							Math.abs(Board.getOffsetTop(square))
	// 						),
	// 					},
	// 					{
	// 						dir: -7,
	// 						abs: Math.min(
	// 							Math.abs(Board.getOffsetTop(square)),
	// 							Board.getOffsetRight(square)
	// 						),
	// 					},
	// 					{
	// 						dir: 7,
	// 						abs: Math.min(
	// 							Math.abs(Board.getOffsetLeft(square)),
	// 							Board.getOffsetBottom(square)
	// 						),
	// 					},
	// 					{
	// 						dir: 9,
	// 						abs: Math.min(
	// 							Board.getOffsetBottom(square),
	// 							Board.getOffsetRight(square)
	// 						),
	// 					},
	// 				];

	// 				const dirLength = directions.length;
	// 				for (var i = 0; i < dirLength; i++) {
	// 					for (var j = 0; j < directions[i].abs; j++) {
	// 						const targetSquare = square + directions[i].dir * (j + 1);
	// 						targets.push({ from: square, to: targetSquare });
	// 						break;
	// 					}
	// 				}

	// 				return targets;
	// 			},
	// 	};
	// }
	}

	getCoveredSquaresFrom(square: number): Array<number> {
		return this.classMap[Piece.GetType(this.board.squares[square])].GetCoveringSquares(this.board, square);
	}

	getSimpleMoves(): Array<SimpleMoves> {
		let simpleMoves: Array<SimpleMoves> = [];
		this.board.pieces[this.board.whiteToMove ? 'white' : 'black'].forEach((piece, square) => {
			simpleMoves = simpleMoves.concat(
				this.classMap[Piece.GetType(piece)].GetSimpleMoves(this.board, square)
			);
		});

		return simpleMoves;
	}
}
