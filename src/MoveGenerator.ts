import Board from "./Board";
import Piece from "./Piece";
import Move from "./Move";

export default class MoveGenerator {
	board: Board;
	moveMap: any;

	constructor(board: Board) {
		this.board = board;
		this.moveMap = {
			[1]: (piece: number, square: number, activeColor: number): Array<number> => { // p
				const targets: Array<number> = [];
				const isWhite: boolean = Piece.GetColor(piece) === Piece.White;

				if (isWhite && activeColor === Piece.White) {
					this.board.squares[square - 7]
						&& Piece.GetColor(this.board.squares[square - 7]) !== activeColor
						&& targets.push(square - 7);

					this.board.squares[square - 9]
						&& Piece.GetColor(this.board.squares[square - 9]) !== activeColor
						&& targets.push(square - 9);

					!this.board.squares[square - 8] && targets.push(square - 8);
					if (square > 47 && square < 56) {
						!this.board.squares[square - 16] && targets.push(square - 16);
					}
				}
				else if (!isWhite && activeColor === Piece.Black) {
					this.board.squares[square + 7]
						&& Piece.GetColor(this.board.squares[square + 7]) !== activeColor
						&& targets.push(square + 7);

					this.board.squares[square + 9]
						&& Piece.GetColor(this.board.squares[square + 9]) !== activeColor
						&& targets.push(square + 9);

					!this.board.squares[square + 8] && targets.push(square + 8);
					if (square > 7 && square < 16) {
						!this.board.squares[square + 16] && targets.push(square + 16);
					}
				}

				// TODO: capture
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

	getMoves(activeColor: number): Array<number> {
		let moves: Array<number> = [];

		for (let squareIndex = 0; squareIndex < this.board.squares.length; squareIndex++) {
			if (this.board.squares[squareIndex]) {
				const result = this.moveMap[
					Piece.GetType(this.board.squares[squareIndex])
				](this.board.squares[squareIndex], squareIndex, activeColor);

				if (result.length > 0) {
					moves = moves.concat(result);
				}
			}
		}

		return moves;
	}
}
