interface CastlingRights {
	kingSide: boolean,
	queenSide: boolean,
}

interface Coordinats {
	[name: string] :number,
}

export default class Board {
	squares: Array<number>;
	whiteToMove: boolean;
	enPassant: number;
	halfmoveClock: number;
	fullmoveNumber: number;
	castlingRights: {
		white: CastlingRights,
		black: CastlingRights,
	};
	static readonly defaultFEN: string = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
	static readonly fileNames: string = 'abcdefgh';
	static readonly rankNames: string = '87654321'; // revers direction makes things easier because FEN starts at a8
	// Board.coord.a8 = 0 ... Board.coord.h1 = 63;
	static readonly coord: Coordinats = (function(): Coordinats {
		const coord: Coordinats = {};
		for (let rankIdx = 0; rankIdx < Board.rankNames.length; rankIdx++) {
			for (let fileIdx = 0; fileIdx < Board.rankNames.length; fileIdx++) {
				coord[`${Board.fileNames[fileIdx]}${Board.rankNames[rankIdx]}`] = rankIdx * 8 + fileIdx;
			}
		}
		return coord;
	})();

	constructor() {
		this.squares = new Array(64);
		this.whiteToMove = true;
		this.enPassant = -1;
		this.halfmoveClock = 0;
		this.fullmoveNumber = 1;
		this.castlingRights = {
			white: { kingSide: false, queenSide: false },
			black: { kingSide: false, queenSide: false },
		};
	}

	load(FEN: string): void {
		const sectionsRegex = /[^\s]+/g;
		const sections = [...FEN.matchAll(sectionsRegex)];
		const sectionsReference = [...Board.defaultFEN.matchAll(sectionsRegex)];

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

		if (sections[1][0].match(/[^w|b]/)) {
			throw new Error ('Invalid FEN: Unknown active color!');
		}

		// yes, this validation allows castling right like 'QQQQ', but it's better than nothing...
		if ([...sections[2][0].matchAll(/([KQkq]{1,4}|-)/g)].length > 1) {
			throw new Error ('Invalid FEN: Invalid castling rights!');
		}

		const enPassantMatch = sections[3][0].match(/[a-h][1-8]|-/g);
		if (!enPassantMatch) {
			throw new Error ('Invalid FEN: Invalid en passant!');
		}

		const movesRegex = /^[0-9]+$/;

		if (!movesRegex.test(sections[4][0])) {
			throw new Error ('Invalid FEN: Invalid halfmove clock value!');
		}

		if (!movesRegex.test(sections[5][0])) {
			throw new Error ('Invalid FEN: Invalid fullmove number!');
		}

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

		this.castlingRights.white.kingSide = sections[2][0].includes('K');
		this.castlingRights.white.queenSide = sections[2][0].includes('Q');
		this.castlingRights.black.kingSide = sections[2][0].includes('k');
		this.castlingRights.black.queenSide = sections[2][0].includes('q');

		this.whiteToMove = sections[1][0] === 'w';


		this.enPassant = enPassantMatch[0] === '-'
			? -1
			: Board.coord[enPassantMatch[0]];


		this.halfmoveClock = parseInt(sections[4][0]);

		this.fullmoveNumber = parseInt(sections[5][0]);
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
