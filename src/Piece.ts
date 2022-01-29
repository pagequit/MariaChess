
export default abstract class Piece {
	static Pawn: number		=  1;
	static Knight: number	=  2;
	static Bishop: number	=  3;
	static Rook: number		=  4;
	static Queen: number	=  5;
	static King: number		=  6;

	static White: number	=  8;
	static Black: number	= 16;

	static PrintableMap: any = {
		[Piece.Pawn]:		'p',
		[Piece.Knight]:	'n',
		[Piece.Bishop]:	'b',
		[Piece.Rook]:		'r',
		[Piece.Queen]:	'q',
		[Piece.King]:		'k',
	};

	static GetColor(piece: number): number {
		return piece & 24;
	}

	static GetType(piece: number): number {
		return piece & 7;
	}

	static GetPrinable(piece: number): string {
		const printableType = Piece.PrintableMap[Piece.GetType(piece)];

		return Piece.GetColor(piece) & 8
			? printableType.toLocaleUpperCase()
			: printableType;
	}
}
