interface CastlingRights {
	kingSide: boolean,
	queenSide: boolean,
}

export default class Board {
	defaultFEN: string;
	squares: Array<number>;
	whiteToMove: boolean;
	enPassant: string;
	fullmoveNumber: number;
	halfmoveClock: number;
	castlingRights: {
		white: CastlingRights,
		black: CastlingRights,
	};

	constructor() {
		this.defaultFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
		this.squares = new Array(64);
		this.castlingRights = {
			white: {kingSide: false, queenSide: false},
			black: {kingSide: false, queenSide: false},
		};
	}

	load(FEN: string): void {
		const sectionsRegex = /[^\s]+/g;
		const sections = [...FEN.matchAll(sectionsRegex)];
		const sectionsReference = [...this.defaultFEN.matchAll(sectionsRegex)];

		if (sections.length !== sectionsReference.length) {
			throw new Error('Invalid FEN: Wrong amount of sections!');
		}

		const rowsRegex = /[^//]+/g;
		const rows = [...sections[0][0].matchAll(rowsRegex)];
		const rowsReference = [...sectionsReference[0][0].matchAll(rowsRegex)];

		if (rows.length !== rowsReference.length) {
			throw new Error('Invalid FEN: Invalid number of rows!');
		}

		const rowCountReference: number = parseInt(rowsReference[2][0]);
		const fileCountReference: number = rowsReference[1][0].length;
		let fileCount: number;
		
		for (let rowCount: number = 0; rowCount < rowCountReference; rowCount++) {
			fileCount = 0;
			for (let char of rows[rowCount][0]) {
				if (isNaN(parseInt(char))) {
					let index = fileCount + (rowCount * rowCountReference);
					let transChar = char.toLowerCase();

					this.squares[index] = transChar === char
						? Piece.Black
						: Piece.White;

					this.squares[index] = this.squares[index] | {
						['p']: Piece.Pawn,
						['n']: Piece.Knight,
						['b']: Piece.Bishop,
						['r']: Piece.Rook,
						['q']: Piece.Queen,
						['k']: Piece.King,
					}[transChar];

					if (!Piece.GetType(this.squares[index])) {
						throw new Error ('Invalid FEN: Unknown piece!');
					}
				}
				else {
					fileCount += parseInt(char) - 1;
				}
				if (++fileCount > fileCountReference) {
					throw new Error ('Invalid FEN: Too many files!');
				}
			}
		}

		if (sections[1][0].match(/[^w|b]/)) {
			throw new Error ('Invalid FEN: Unknown active color!');
		}

		this.whiteToMove = sections[1][0] === 'w';

		// yes, this validation allows a string like 'QQQQ', but it's better than nothing...
		if ([...sections[2][0].matchAll(/([KQkq]{1,4}|-)/g)].length > 1) {
			throw new Error ('Invalid FEN: Invalid castling rights!');
		}

		this.castlingRights.white.kingSide = sections[2][0].includes('K');
		this.castlingRights.white.queenSide = sections[2][0].includes('Q');
		this.castlingRights.black.kingSide = sections[2][0].includes('k');
		this.castlingRights.black.queenSide = sections[2][0].includes('q');
	}
}

export abstract class Piece {
	static Pawn: number		=  1;
	static Knight: number	=  2;
	static Bishop: number	=  3;
	static Rook: number		=  4;
	static Queen: number	=  5;
	static King: number		=  6;
	
	static White: number	=  8;
	static Black: number	= 16;
	
	static GetColor(piece: number): number {
		return piece & 24;
	}
	
	static GetType(piece: number): number {
		return piece & 7;
	}
}

enum MoveMask {
	Normal		=  1,
	Capture		=  2,
	BigPawn		=  4,
	EnPassant	=  8,
	Promotion	= 16,
	KCastle		= 32,
	QCastle		= 64,
}
