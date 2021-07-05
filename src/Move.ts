import Board from './Board';
import UCIUtility from './UCIUtility';
import CastlingRights from './interfaces/CastlingRights';
import Moves from './interfaces/Moves';

export default class Move implements Moves {
	from: number;
	to: number;
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

		let promotion = UCIUtility.moveIsPromotion(move)
			? UCIUtility.moveGetPromotion(move)
			: null;

		if (promotion) {
			// do promotion stuff;
		}

		const from = UCIUtility.moveFrom(move);
		const to = UCIUtility.moveTo(move);

		const piece = board.squares[Board.coord[from]];
		board.squares[Board.coord[from]] = null;
		board.squares[Board.coord[to]] = piece;

		board.moves.push(this);
	}
}
