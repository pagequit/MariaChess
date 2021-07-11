import Board from './Board';
import Piece from './Piece';
import UCIUtility from './UCIUtility';
import CastlingRights from './interfaces/CastlingRights';
import Moves from './interfaces/Moves';

export default class Move implements Moves {
	from: string;
	to: string;
	isCapture: boolean;
	captureSquare: number;
	capturePiece: number;
	isPromotion: boolean;
	promotionPiece: number;

	whiteToMove: boolean;
	enPassant: number;
	halfmoveClock: number;
	fullmoveNumber: number;
	castlingRights: {
		white: CastlingRights,
		black: CastlingRights,
	};

	constructor(board: Board, move: string) {

		// TODO: Validate move!

		this.isPromotion = UCIUtility.moveIsPromotion(move)
		if (this.isPromotion) {
			const char = UCIUtility.moveGetPromotion(move);
			const transChar =  char.toLowerCase();
			this.promotionPiece = transChar === char
				? Piece.Black
				: Piece.White;

			this.promotionPiece = this.promotionPiece | {
				['p']: Piece.Pawn,
				['n']: Piece.Knight,
				['b']: Piece.Bishop,
				['r']: Piece.Rook,
				['q']: Piece.Queen,
				['k']: Piece.King,
			}[transChar];
		}

		this.from = UCIUtility.moveFrom(move);
		this.to = UCIUtility.moveTo(move);

		// TODO:
		// - Capture
		// - En Passant
		// - Castling
		// - Promotion

		const piece = board.squares[Board.coord[this.from]];
		board.squares[Board.coord[this.from]] = null;
		board.squares[Board.coord[this.to]] = piece;

		board.moves.push(this);
	}
}
