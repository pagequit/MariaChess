import Board from "./Board";
import Piece from "./Piece";
import Move from "./Move";

export default class MoveGenerator {
	board: Board;
	moveMap: any;

	constructor(board: Board) {
		this.board = board;
		this.moveMap = {
			[1]: (piece: number, square: number): Array<number> => { // p
				const black: boolean = !!(Piece.GetColor(piece) >> 4);
				const targets: Array<number> = [];

				black
					? targets.push(square + 8)
					: targets.push(square - 8);

				if (black && square > 7 && square < 16) {
					targets.push(square + 16)
				}
				else if (square > 47 && square < 56) {
					targets.push(square - 16)
				}

				// TODO: en passant

				return targets;
			},
			[2]: (piece: number, square: number): Array<number> => { // n
				//console.log(Piece.GetPrinable(piece));
				return [];
			},
			[3]: (piece: number, square: number): Array<number> => { // b
				// console.log(Piece.GetPrinable(piece));
				return [];
			},
			[4]: (piece: number, square: number): Array<number> => { // r
				// console.log(Piece.GetPrinable(piece));
				return [];
			},
			[5]: (piece: number, square: number): Array<number> => { // q
				// console.log(Piece.GetPrinable(piece));
				return [];
			},
			[6]: (piece: number, square: number): Array<number> => { // k
				// console.log(Piece.GetPrinable(piece));
				return [];
			},
		};
	}

	getMoves(iterations: number): Array<Array<number>> {

		const moves = [];
		while (iterations-- > 0) {
			let i_moves: Array<number> = [];

			for (let i = 0; i < this.board.squares.length; i++) {
				if (this.board.squares[i]) {
					const result = this.moveMap[Piece.GetType(this.board.squares[i])](this.board.squares[i], i);
					if (result.length > 0) {
						i_moves = i_moves.concat(result);
					}
				}
			}

			moves.push(i_moves);
		}

		return moves;
	}
}
