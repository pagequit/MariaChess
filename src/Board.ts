export default class Board {
	readonly defaultFEN: string = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
	squares: Array<number>;

	constructor() {
		this.squares = new Array(64);
	}

	parseFEN(FEN: string): void { }
}

export abstract class Piece {
	static None: number		=  0;
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
