import Board from './Board';
import Piece from './Piece';
import UCIUtility from './UCIUtility';
import CastlingRights from './interfaces/CastlingRights';
import Moves from './interfaces/Moves';

export default class Move implements Moves {
	from: string;
	to: string;
	isCapture: boolean;
	isEnPassant: boolean;
	isCastlingQueenSide: boolean;
	isCastlingKingSide: boolean;
	captureSquare: number;
	capturePiece: number;
	isPromotion: boolean;
	promotionPiece: number;
	piece: number;
	previousMove: Move;

	whiteToMove: boolean;
	enPassant: number;
	halfmoveClock: number;
	fullmoveNumber: number;
	castlingRights: {
		white: CastlingRights,
		black: CastlingRights,
	};

	constructor(board: Board, move: string) {
		this.whiteToMove = !board.whiteToMove;
		this.halfmoveClock = board.halfmoveClock + 1;
		this.fullmoveNumber = board.fullmoveNumber;
		this.fullmoveNumber += this.whiteToMove ? 1 : 0;

		this.from = UCIUtility.moveFrom(move);
		this.to = UCIUtility.moveTo(move);
		this.isPromotion = UCIUtility.moveIsPromotion(move);

		this.piece = board.squares[Board.coord[this.from]];
		this.previousMove = board.moves[board.moves.length -1];

		this.enPassant = board.enPassant;
		this.castlingRights = board.castlingRights;

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

		// TODO:
		// - Capture
		// - En Passant
		// - Castling
		// - Promotion
	}
}
