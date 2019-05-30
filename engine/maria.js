class Piece {
	constructor(square, color, symbol = '?') {
		this.square = square;
		this.color = color;
		this.symbol = symbol;
	}
}

class Pawn extends Piece {
	constructor(square, color, symbol) {
		super(square, color, symbol);
	}
}

class Knight extends Piece {
	constructor(square, color, symbol) {
		super(square, color, symbol);
	}
}

class Bishop extends Piece {
	constructor(square, color, symbol) {
		super(square, color, symbol);
	}
}

class Rook extends Piece {
	constructor(square, color, symbol) {
		super(square, color, symbol);
	}
}

class Queen extends Piece {
	constructor(square, color, symbol) {
		super(square, color, symbol);
	}
}

class King extends Piece {
	constructor(square, color, symbol) {
		super(square, color, symbol);
	}
}

class PieceFactory {
	constructor(board) {
		this.board = board;
	}

	blueprint(symbol, square) {
		const blueprints =  {
			P: () => new Pawn(square,'w', symbol),
			p: () => new Pawn(square,'b', symbol),
			N: () => new Knight(square,'w', symbol),
			n: () => new Knight(square,'b', symbol),
			B: () => new Bishop(square,'w', symbol),
			b: () => new Bishop(square,'b', symbol),
			R: () => new Rook(square,'w', symbol),
			r: () => new Rook(square,'b', symbol),
			Q: () => new Queen(square,'w', symbol),
			q: () => new Queen(square,'b', symbol),
			K: () => new King(square,'w', symbol),
			k: () => new King(square,'b', symbol),
		};

		return blueprints[symbol]();
	}

	createPiece(symbol, coordinate) {
		return this.blueprint(symbol, this.board[coordinate]);
	}
}


class Square {
	constructor(board, coordinate) {
		this.board = board;
		this.coordinate = coordinate;
		this.piece = null;
	}
}


class Board {
	constructor(engine) {
		this.engine = engine;
		this.files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
		this.ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
		this.activeColor = null;
		this.castlingAvailability = null;
		this.enPassant = null;
		this.halfmoveClock = null;
		this.fullmoveNumber = null;
		this.moveHistory = [];
		this.pieces = {
			w: [],
			b: [],
		};

		this.squares = [];
		this.eachCoordinate(coordinate => {
			this[coordinate] = new Square(this, coordinate);
		});

		this.pieceFactory = new PieceFactory(this);
	}

	/*
	eachSquare(callback) {
		for ( let f = 0; f < this.files.length; f++ ) {
			for ( let r = 0; r < this.ranks.length; r++ ) {
				callback(this.squares[f][r]);
			}
		}
	}
	*/

	placePieces(FENPiecePlacement) {
		let entries = FENPiecePlacement.match(/\w/g);
		entries = entries.map(entry => Number.isInteger(parseInt(entry)) ? parseInt(entry) : entry );

		let index = 0;
		this.eachCoordinate(coordinate => {
			if ( Number.isInteger(entries[index]) && entries[index] > 0 ) {
				--entries[index] <= 0 && index++;
			}
			else {
				this[coordinate].piece = this.pieceFactory.createPiece(entries[index], coordinate);
				this.pieces[this[coordinate].piece.color] = this[coordinate].piece;
				index++;
			}
		});
	}

	eachCoordinate(callback) {
		for ( let r = this.ranks.length - 1; r >= 0; r-- ) {
			for ( let f = 0; f < this.files.length; f++ ) {
				callback(this.files[f] + this.ranks[r]);
			}
		}
	}

	parseFEN(fen) {
		const fenChunks = fen.split(' ', 6);
		if ( fenChunks.length != 6 ) {
			throw `Invalid FEN: ${fen}`;
		}

		return {
			piecePlacement: fenChunks[0],
			activeColor: fenChunks[1],
			castlingAvailability: fenChunks[2],
			enPassant: fenChunks[3],
			halfmoveClock: fenChunks[4],
			fullmoveNumber: fenChunks[5],
		};
	}

	init(fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
		const board = this.parseFEN(fen);

		this.fullmoveNumber = parseInt(board.fullmoveNumber);
		this.halfmoveClock = parseInt(board.halfmoveClock);
		this.enPassant = board.enPassant;
		this.castlingAvailability = board.castlingAvailability;
		this.activeColor = board.activeColor;

		this.placePieces(board.piecePlacement);
	}
}


class MoveGenerator {
	constructor(board) {
		this.board = board;
	}
}


class Engine {
	constructor() {
		this.board = new Board(this);
		this.moveGenerator = new MoveGenerator(this.board);
		this.bestmove = null;
		this.ui = null;
	}

	init() {
		this.board.init();
	}
}

const maria = new Engine();
maria.init();
console.log(maria);