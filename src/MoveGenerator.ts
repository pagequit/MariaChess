import Board from "./Board";
import Piece from "./Piece";

export default class MoveGenerator {
	board: Board;
	moveMap: any;

	constructor(board: Board) {
		this.board = board;
		this.moveMap = {
			// --- Pawn ---
			[1]: (piece: number, square: number, activeColor: number): Array<number> => {
				const targets: Array<number> = [];
				const isWhite: boolean = Piece.GetColor(piece) === Piece.White;
				const sign: string = isWhite ? '-' : '+';
				const calc: any = {
					['+']: (a: number, b: number) => a + b,
					['-']: (a: number, b: number) => a - b,
				}

				Board.getOffsetLeft(square) < 0
					&& this.board.squares[calc[sign](square, 9)]
					&& Piece.GetColor(this.board.squares[calc[sign](square, 9)]) !== activeColor
					&& targets.push(calc[sign](square, 9));

				Board.getOffsetRight(square) > 0
					&& this.board.squares[calc[sign](square, 7)]
					&& Piece.GetColor(this.board.squares[calc[sign](square, 7)]) !== activeColor
					&& targets.push(calc[sign](square, 7));

				if (this.board.enPassant >= 0) {
					calc[sign](square, 7) === this.board.enPassant
						&& targets.push(calc[sign](square, 7));

					calc[sign](square, 9) === this.board.enPassant
						&& targets.push(calc[sign](square, 9));
				}

				if (!this.board.squares[calc[sign](square, 8)]) {
					targets.push(calc[sign](square, 8));

					if ((square > 47 && square < 56) || (square > 7 && square < 16)) {
						!this.board.squares[calc[sign](square, 16)] && targets.push(calc[sign](square, 16));
					}
				}

				// TODO: capture
				// TODO: en passant
				// TODO: boundaries >.<

				return targets;
			},
			// --- Knight ---
			[2]: (piece: number, square: number): Array<number> => {
				// +/-17 +/-15 +/-10 +/-6
				// 4k3/8/8/8/8/8/8/N3K3 w - f6 0 1
				// 4k3/8/8/8/8/8/8/1N2K3 w - f6 0 1
				const targets: Array<number> = [];
				const isWhite: boolean = Piece.GetColor(piece) === Piece.White;

				let isAtBorderLeft: boolean = Board.getOffsetRight(square) > 0;
				let isAtBorderTop: boolean;
				let isAtBorderRight: boolean;
				let isAtBorderBottom: boolean;

				return targets;
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

	getMoves(): Array<number> {
		let moves: Array<number> = [];
		this.board.pieces[this.board.whiteToMove ? 'white' : 'black'].forEach((piece, square) => {
			moves = moves.concat(
				this.moveMap[Piece.GetType(piece)](piece, square, this.board.activeColor)
			);
		});

		return moves;
	}
}
