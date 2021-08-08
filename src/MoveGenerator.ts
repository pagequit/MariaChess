import Board from "./Board";
import Piece from "./Piece";

export default class MoveGenerator {
	board: Board;
	moveMap: any;

	constructor(board: Board) {
		this.board = board;
		this.moveMap = {
			// --- Pawn ---
			[1]: (square: number, activeColor: number): Array<number> => {
				const targets: Array<number> = [];
				const sign: string = activeColor === Piece.White ? '-' : '+';
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

				return targets;
			},
			// --- Knight ---
			[2]: (square: number, activeColor: number): Array<number> => {
				let targets: Array<number> = [];
				const calc: any = {
					[0]: (a: number, b: number) => a + b,
					[1]: (a: number, b: number) => a - b,
				}
				const squares: Array<number> = [17, 15, 10, 6];

				for (var sign = 0; sign < 2; sign++) {
					for (var i = 0; i < 4; i++) {
						targets.push(calc[sign](square, squares[i]));
					}
				}

				targets = targets.filter(targetSquare => {
					return this.board.squares[targetSquare] !== undefined && (this.board.squares[targetSquare] === null
						|| Piece.GetColor(this.board.squares[targetSquare]) !== activeColor)
						&& Math.abs(Board.getOffsetLeft(square) - Board.getOffsetLeft(targetSquare)) < 3;
				});

				return targets;
			},
			// --- Bishop ---
			[3]: (square: number, activeColor: number): Array<number> => {
				let targets: Array<number> = [];
				const directions: Array<any> = [
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
							Math.abs(Board.getOffsetRight(square))
						),
					},
					{
						dir: 7,
						abs: Math.min(
							Math.abs(Board.getOffsetRight(square)),
							Math.abs(Board.getOffsetBottom(square))
						),
					},
					{
						dir: 9,
						abs: Math.min(
							Math.abs(Board.getOffsetBottom(square)),
							Math.abs(Board.getOffsetLeft(square))
						),
					},
				];

				for (var i = 0; i < directions.length; i++) {
					for (var j = 0; j < directions[i].abs; j++) {
						var targetSquare = square + directions[i].dir * (j + 1);
						if (Piece.GetColor(this.board.squares[targetSquare]) === activeColor) {
							break;
						}

						targets.push(targetSquare);
					}
				}

				return targets;
			},
			// --- Rook ---
			[4]: (square: number, activeColor: number): Array<number> => {
				let targets: Array<number> = [];
				const directions: Array<number> = [-8, -1, 1, 8];

				return [];
			},
			// --- Queen ---
			[5]: (square: number, activeColor: number): Array<number> => {
				let targets: Array<number> = [];
				const directions: Array<number> = [-9, -8, -7, -1, 1, 7, 8, 9];

				return [];
			},
			// --- King ---
			[6]: (square: number, activeColor: number): Array<number> => {
				let targets: Array<number> = [];
				const directions: Array<number> = [-9, -8, -7, -1, 1, 7, 8, 9];

				return [];
			},
		};
	}

	getMoves(): Array<number> {
		let moves: Array<number> = [];
		this.board.pieces[this.board.whiteToMove ? 'white' : 'black'].forEach((piece, square) => {
			moves = moves.concat(
				this.moveMap[Piece.GetType(piece)](square, this.board.activeColor)
			);
		});

		return moves;
	}
}
