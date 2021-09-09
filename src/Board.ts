import Piece from './Piece';
import Move from './Move';
import MoveGenerator from './MoveGenerator';
import CastlingRights from './interfaces/CastlingRights';
import Moves from './interfaces/Moves';
import Coordinates from './interfaces/Coordinates';

export default class Board implements Moves {
	moves: Array<Move>;
	squares: Array<number>;
	whiteToMove: boolean;
	enPassant: number;
	halfmoveClock: number;
	fullmoveNumber: number;
	castlingRights: {
		white: CastlingRights,
		black: CastlingRights,
	};
	pieces: {
		white: Map<number, number>,
		black: Map<number, number>,
	}

	whiteKingPos: number;
	blackKingPos: number;

	moveGen: MoveGenerator;

	static readonly startposFEN: string = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
	static readonly fileNames: string = 'abcdefgh';
	static readonly rankNames: string = '87654321'; // revers direction because FEN starts at a8

	// Board.coord.a8 = 0 ... Board.coord.h1 = 63;
	static readonly coord: Coordinates = (function(): Coordinates {
		const coord: Coordinates = {};
		for (let rankIdx = 0; rankIdx < Board.rankNames.length; rankIdx++) {
			for (let fileIdx = 0; fileIdx < Board.rankNames.length; fileIdx++) {
				coord[`${Board.fileNames[fileIdx]}${Board.rankNames[rankIdx]}`] = rankIdx * 8 + fileIdx;
			}
		}
		return coord;
	}());

	constructor() {
		this.moves = [];
		this.squares = new Array(64);
		this.squares.fill(null);
		this.whiteToMove = true;
		this.enPassant = -1;
		this.halfmoveClock = 0;
		this.fullmoveNumber = 1;
		this.castlingRights = {
			white: { kingSide: false, queenSide: false },
			black: { kingSide: false, queenSide: false },
		};
		this.pieces = {
			white: new Map(),
			black: new Map(),
		}

		this.moveGen = new MoveGenerator(this);
	}

	static SquareToAlgebraic(square: number): string {
		let algebraic = Board.fileNames[(square & 7)];
		algebraic += Board.rankNames[(square >> 3)];

		return algebraic;
	}

	static getOffsetLeft(square: number): number {
		return -(square % 8);
	}

	static getOffsetRight(square: number): number {
		return Board.getOffsetLeft(square) - 1 + 8;
	}

	static getOffsetBottom(square: number): number {
		return Math.floor((63 - square) / 8);
	}

	static getOffsetTop(square: number): number {
		return Board.getOffsetBottom(square) + 1 - 8;
	}

	get activeColor(): number {
		return this.whiteToMove
			? Piece.White
			: Piece.Black;
	}

	applyMove(move: Move) {
		this.squares[Board.coord[move.from]] = null;
		this.squares[Board.coord[move.to]] = move.piece;
		this.whiteToMove = move.whiteToMove;
		this.enPassant = move.enPassant;
		this.halfmoveClock = move.halfmoveClock;
		this.fullmoveNumber = move.fullmoveNumber;
		this.castlingRights = move.castlingRights;

		this.moves.push(move);
	}

	reset(): void {
		this.load(Board.startposFEN);
	}

	load(FEN: string): void {
		const sectionsRegex = /[^\s]+/g;
		const sections = [...FEN.matchAll(sectionsRegex)];
		const sectionsReference = [...Board.startposFEN.matchAll(sectionsRegex)];

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
			throw new Error('Invalid FEN: Unknown active color!');
		}

		// yes, this validation allows castling right like 'QQQQ', but it's better than nothing...
		if ([...sections[2][0].matchAll(/([KQkq]{1,4}|-)/g)].length > 1) {
			throw new Error('Invalid FEN: Invalid castling rights!');
		}

		const enPassantMatch = sections[3][0].match(/[a-h][1-8]|-/g);
		if (!enPassantMatch) {
			throw new Error('Invalid FEN: Invalid en passant!');
		}

		const movesRegex = /^[0-9]+$/;

		if (!movesRegex.test(sections[4][0])) {
			throw new Error('Invalid FEN: Invalid halfmove clock value!');
		}

		if (!movesRegex.test(sections[5][0])) {
			throw new Error('Invalid FEN: Invalid fullmove number!');
		}

		this.squares = new Array(64);
		this.squares.fill(null);
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
						throw new Error('Invalid FEN: Unknown piece!');
					}
				}
				else {
					fileCount += parseInt(char) - 1;
				}
				if (++fileCount > fileCountReference) {
					throw new Error('Invalid FEN: Too many files!');
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

		this.pieces.white.clear();
		this.pieces.black.clear();
		for (let i = 0; i < this.squares.length; i++) {
			if (Piece.GetColor(this.squares[i]) === Piece.White) {
				this.pieces.white.set(i, this.squares[i]);
				if (Piece.GetType(this.squares[i]) === 6) {
					this.whiteKingPos = i;
				}
			}
			else if (Piece.GetColor(this.squares[i]) === Piece.Black) {
				this.pieces.black.set(i, this.squares[i]);
				if (Piece.GetType(this.squares[i]) === 6) {
					this.blackKingPos = i;
				}
			}
		}
	}

	toFEN(): string {
		let FEN: string = '';
		let nextOffset: number = 0;
		let lastFile: boolean = false;

		for (let i: number = 0; i <= this.squares.length; i++) {
			lastFile = !((i + 1) % 8);

			if (!this.squares[i]) {
				nextOffset++;

				if (lastFile) {
					FEN += nextOffset;
					nextOffset = 0;
				}
			}
			else {
				FEN += nextOffset === 0
					? Piece.GetPrinable(this.squares[i])
					: nextOffset + Piece.GetPrinable(this.squares[i]);

				nextOffset = 0;
			}
			if (lastFile) {
				FEN += '/';
			}
		}

		// remove the last '/'
		FEN = FEN.substr(0, FEN.length - 1);

		FEN += this.whiteToMove ? ' w ' : ' b ';

		let castlingRights: string = '';
		if (this.castlingRights.white.kingSide) {
			castlingRights += 'K';
		}
		if (this.castlingRights.white.queenSide) {
			castlingRights += 'Q';
		}
		if (this.castlingRights.black.kingSide) {
			castlingRights += 'k';
		}
		if (this.castlingRights.black.queenSide) {
			castlingRights += 'q';
		}
		if (castlingRights.length === 0) {
			castlingRights = '-';
		}

		FEN += castlingRights;

		FEN += this.enPassant >= 0
			? ' ' + Board.SquareToAlgebraic(this.enPassant)
			: ' -';

		FEN += ' ' + this.halfmoveClock;
		FEN += ' ' + this.fullmoveNumber;

		return FEN;
	}
}
