
export default abstract class Piece {
	static Pawn		=  1;
	static Knight	=  2;
	static Bishop	=  3;
	static Rook		=  4;
	static Queen	=  5;
	static King		=  6;

	static White	=  8;
	static Black	= 16;

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
