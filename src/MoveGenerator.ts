import Board from './Board';
import Piece from './Piece';
import SimpleMoves from './interfaces/SimpleMoves';

export default class MoveGenerator {
	board: Board;
	moveMap: any;

	constructor(board: Board) {
		this.board = board;
		this.moveMap = {
			// --- Pawn ---
			[1]: (square: number, activeColor: number): Array<SimpleMoves> => {
				const targets: Array<SimpleMoves> = [];
				const sign: string = activeColor === Piece.White ? '-' : '+';
				const calc: any = {
					['+']: (a: number, b: number) => a + b,
					['-']: (a: number, b: number) => a - b,
				}

				Board.getOffsetLeft(square) < 0
					&& this.board.squares[calc[sign](square, 9)]
					&& Piece.GetColor(this.board.squares[calc[sign](square, 9)]) !== activeColor
					&& targets.push({ from: square, to: calc[sign](square, 9) });

				Board.getOffsetRight(square) > 0
					&& this.board.squares[calc[sign](square, 7)]
					&& Piece.GetColor(this.board.squares[calc[sign](square, 7)]) !== activeColor
					&& targets.push({ from: square, to: calc[sign](square, 7) });

				if (this.board.enPassant >= 0) {
					calc[sign](square, 7) === this.board.enPassant
						&& targets.push({ from: square, to: calc[sign](square, 7) });

					calc[sign](square, 9) === this.board.enPassant
						&& targets.push({ from: square, to: calc[sign](square, 9) });
				}

				if (!this.board.squares[calc[sign](square, 8)]) {
					targets.push({ from: square, to: calc[sign](square, 8) });

					if ((square > 47 && square < 56) || (square > 7 && square < 16)) {
						!this.board.squares[calc[sign](square, 16)]
						&& targets.push({ from: square, to: calc[sign](square, 16) });
					}
				}

				return targets;
			},
			// --- Knight ---
			[2]: (square: number, activeColor: number): Array<SimpleMoves> => {
				let targets: Array<SimpleMoves> = [];
				const calc: any = {
					[0]: (a: number, b: number) => a + b,
					[1]: (a: number, b: number) => a - b,
				}
				const squares: Array<number> = [17, 15, 10, 6];

				for (var sign = 0; sign < 2; sign++) {
					for (var i = 0; i < 4; i++) {
						targets.push({ from: square, to: calc[sign](square, squares[i]) });
					}
				}

				targets = targets.filter(({ to }) => {
					return this.board.squares[to] !== undefined && (this.board.squares[to] === null
						|| Piece.GetColor(this.board.squares[to]) !== activeColor)
						&& Math.abs(Board.getOffsetLeft(square) - Board.getOffsetLeft(to)) < 3;
				});

				return targets;
			},
			// --- Bishop ---
			[3]: (square: number, activeColor: number): Array<SimpleMoves> => {
				const targets: Array<SimpleMoves> = [];
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

				const dirLength = directions.length;
				for (var i = 0; i < dirLength; i++) {
					for (var j = 0; j < directions[i].abs; j++) {
						const targetSquare = square + directions[i].dir * (j + 1);
						if (Piece.GetColor(this.board.squares[targetSquare]) === activeColor) {
							break;
						}

						targets.push({ from: square, to: targetSquare });
					}
				}

				return targets;
			},
			// --- Rook ---
			[4]: (square: number, activeColor: number): Array<SimpleMoves> => {
				const targets: Array<SimpleMoves> = [];
				const directions: Array<any> = [
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

				const dirLength = directions.length;
				for (var i = 0; i < dirLength; i++) {
					for (var j = 0; j < directions[i].abs; j++) {
						const targetSquare = square + directions[i].dir * (j + 1);
						if (Piece.GetColor(this.board.squares[targetSquare]) === activeColor) {
							break;
						}

						targets.push({ from: square, to: targetSquare });
					}
				}

				return targets;
			},
			// --- Queen ---
			[5]: (square: number, activeColor: number): Array<SimpleMoves> => {
				const targets: Array<SimpleMoves> = [];
				const directions: Array<any> = [
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

				const dirLength = directions.length;
				for (var i = 0; i < dirLength; i++) {
					for (var j = 0; j < directions[i].abs; j++) {
						const targetSquare = square + directions[i].dir * (j + 1);
						if (Piece.GetColor(this.board.squares[targetSquare]) === activeColor) {
							break;
						}

						targets.push({ from: square, to: targetSquare });
					}
				}

				return targets;
			},
			// --- King ---
			[6]: (square: number, activeColor: number): Array<SimpleMoves> => {
				const targets: Array<SimpleMoves> = [];
				const directions: Array<number> = [-9, -8, -7, -1, 1, 7, 8, 9];

				for (var i = 0; i < directions.length; i++) {
					const targetSquare = square + directions[i];
					if (Piece.GetColor(this.board.squares[targetSquare]) !== activeColor) {
						targets.push({ from: square, to: targetSquare });
					}
				}

				// TODO: castle

				return targets;
			},
		};
	}

	getMoves(): Array<SimpleMoves> {
		let moves: Array<SimpleMoves> = [];
		this.board.pieces[this.board.whiteToMove ? 'white' : 'black'].forEach((piece, square) => {
			moves = moves.concat(
				this.moveMap[Piece.GetType(piece)](square, this.board.activeColor)
			);
		});

		return moves;
	}
}
