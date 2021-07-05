import CastlingRights from './CastlingRights';

export default interface Moves {
	whiteToMove: boolean;
	enPassant: number;
	halfmoveClock: number;
	fullmoveNumber: number;
	castlingRights: {
		white: CastlingRights,
		black: CastlingRights,
	};
}
