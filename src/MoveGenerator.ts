import Board from './Board';
import Piece from './Piece';
import SimpleMoves from './interfaces/SimpleMoves';

import Pawn from './pieces/Pawn';
import Knight from './pieces/Knight';
import Bishop from './pieces/Bishop';
import Rook from './pieces/Rook';
import Queen from './pieces/Queen';
import King from './pieces/King';

const classMap = {
	[Piece.Pawn]: Pawn,
	[Piece.Knight]: Knight,
	[Piece.Bishop]: Bishop,
	[Piece.Rook]: Rook,
	[Piece.Queen]: Queen,
	[Piece.King]: King,
};

export default class MoveGenerator {
	board: Board;
	classMap: typeof classMap;

	constructor(board: Board) {
		this.board = board;
		this.classMap = classMap;
	}

	getCoveredSquaresFrom(square: number): number[] {
		return this.classMap[Piece.GetType(this.board.squares[square])].GetCoveringSquares(this.board, square);
	}

	getSimpleMoves(): SimpleMoves[] {
		let simpleMoves: SimpleMoves[] = [];
		this.board.pieces[this.board.whiteToMove ? 'white' : 'black'].forEach((piece, square) => {
			simpleMoves = simpleMoves.concat(
				this.classMap[Piece.GetType(piece)].GetSimpleMoves(this.board, square)
			);
		});

		return simpleMoves;
	}
}
