
export default abstract class Piece {
	static Pawn: number		=  1;
	static Knight: number	=  2;
	static Bishop: number	=  3;
	static Rook: number		=  4;
	static Queen: number	=  5;
	static King: number		=  6;

	static White: number	=  8;
	static Black: number	= 16;

	static readonly printableMap: any = {
		[1]: 'p',
		[2]: 'n',
		[3]: 'b',
		[4]: 'r',
		[5]: 'q',
		[6]: 'k',
	};

	static GetColor(piece: number): number {
		return piece & 24;
	}

	static GetType(piece: number): number {
		return piece & 7;
	}

	static GetPrinable(piece: number): string {
		let printableType: string = Piece.printableMap[Piece.GetType(piece)];

		return Piece.GetColor(piece) & 8
			? printableType.toLocaleUpperCase()
			: printableType;
	}
}