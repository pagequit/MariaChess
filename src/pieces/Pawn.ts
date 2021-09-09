import Board from "../Board";
import Piece from "../Piece";
import SimpleMoves from "../interfaces/SimpleMoves";

export default class Pawn {
	static Calc: any = {
		['+']: (a: number, b: number) => a + b,
		['-']: (a: number, b: number) => a - b,
	}

	static GetSign(board: Board) {
		return board.activeColor === Piece.White ? '-' : '+';
	}

	static GetSimpleMoves(board: Board, square: number): Array<SimpleMoves> {
		const targets: Array<SimpleMoves> = [];
		const sign: string = Pawn.GetSign(board);

		Board.getOffsetLeft(square) < 0
			&& board.squares[Pawn.Calc[sign](square, 9)]
			&& Piece.GetColor(board.squares[Pawn.Calc[sign](square, 9)]) !== board.activeColor
			&& targets.push({ from: square, to: Pawn.Calc[sign](square, 9) });

		Board.getOffsetRight(square) > 0
			&& board.squares[Pawn.Calc[sign](square, 7)]
			&& Piece.GetColor(board.squares[Pawn.Calc[sign](square, 7)]) !== board.activeColor
			&& targets.push({ from: square, to: Pawn.Calc[sign](square, 7) });

		if (board.enPassant >= 0) {
			Pawn.Calc[sign](square, 7) === board.enPassant
				&& targets.push({ from: square, to: Pawn.Calc[sign](square, 7) });

				Pawn.Calc[sign](square, 9) === board.enPassant
				&& targets.push({ from: square, to: Pawn.Calc[sign](square, 9) });
		}

		if (!board.squares[Pawn.Calc[sign](square, 8)]) {
			targets.push({ from: square, to: Pawn.Calc[sign](square, 8) });

			if ((square > 47 && square < 56) || (square > 7 && square < 16)) {
				!board.squares[Pawn.Calc[sign](square, 16)]
				&& targets.push({ from: square, to: Pawn.Calc[sign](square, 16) });
			}
		}

		return targets;
	}

	static GetCoveringSquares(board: Board, square: number): Array<number> {
		const targets: Array<number> = [];
		const sign: string = Pawn.GetSign(board);

		Board.getOffsetLeft(square) < 0
			&& targets.push(Pawn.Calc[sign](square, 9));

		Board.getOffsetRight(square) > 0
			&& targets.push(Pawn.Calc[sign](square, 7));

		if (board.enPassant >= 0) {
			targets.push(board.enPassant);
		}

		return targets;
	}
}
