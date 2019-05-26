
const colorCode = {
	w: 0,
	b: 32
};

Board.prototype.pieceFactory = {
	P: square => new Pawn(square,'w'),
	p: square => new Pawn(square,'b'),
	N: square => new Knight(square,'w'),
	n: square => new Knight(square,'b'),
	B: square => new Bishop(square,'b'),
	b: square => new Bishop(square,'w'),
	R: square => new Rook(square,'b'),
	r: square => new Rook(square,'w'),
	Q: square => new Queen(square,'b'),
	q: square => new Queen(square,'w'),
	K: square => new King(square,'b'),
	k: square => new King(square,'w'),
};

class Piece {
	constructor(square, color, symbol = '?') {
		this.square = square;
		this.color = color;
		this.symbol = symbol;
		this.nettoValue = 0;
	}
}

class Pawn extends Piece {
	constructor(square, color) {
		super(square, color);

		this.symbol = String.fromCharCode('P'.charCodeAt(0) - colorCode[this.color]);
		this.nettoValue = 1;
	}
}

class Knight extends Piece {
	constructor(square, color) {
		super(square, color);
		this.symbol = String.fromCharCode('N'.charCodeAt(0) - colorCode[this.color]);
	}
}

class Bishop extends Piece {
	constructor(square, color) {
		super(square, color);
		this.symbol = String.fromCharCode('B'.charCodeAt(0) - colorCode[this.color]);
	}
}

class Rook extends Piece {
	constructor(square, color) {
		super(square, color);
		this.symbol = String.fromCharCode('R'.charCodeAt(0) - colorCode[this.color]);
	}
}

class Queen extends Piece {
	constructor(square, color) {
		super(square, color);
		this.symbol = String.fromCharCode('Q'.charCodeAt(0) - colorCode[this.color]);
	}
}

class King extends Piece {
	constructor(square, color) {
		super(square, color);
		this.symbol = String.fromCharCode('K'.charCodeAt(0) - colorCode[this.color]);
	}
}

function Square(board, coordinate) {
	this.board = board;
	this.coordinate = coordinate;
	this.piece = null;
}

function Board(engine) {
	this.engine = engine;
	this.startpos = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'; // <- is this UCI stuff?
	this.activeColor = null;
	this.castlingAvailability = null;
	this.enPassant = null;
	this.halfmoveClock = null;
	this.fullmoveNumber = null;
	this.moveHistory = [];
	this.remainingPieces = {
		w: [],
		b: [],
	};

	this.eachCoordinate(coordinate => {
		this[coordinate] = new Square(this, coordinate);
	});
}

/**
 * Moves FEN like from a8-h1.
 */
Board.prototype.eachCoordinate = function(callback) {
	for ( let i = 0; i < 8; i++ ) {
		let rank = String.fromCharCode('8'.charCodeAt(0) - i);
		for ( let j = 0; j < 8; j++ ) {
			let file = String.fromCharCode('a'.charCodeAt(0) + j);
			callback(file + rank);
		}
	}
};

Board.prototype.eachSquare = function(callback) {
	for ( let i = 0; i < 8; i++ ) {
		let rank = String.fromCharCode('8'.charCodeAt(0) - i);
		for ( let j = 0; j < 8; j++ ) {
			let file = String.fromCharCode('a'.charCodeAt(0) + j);
			callback(this[file + rank]);
		}
	}
};

Board.prototype.placePieces = function(FENPiecePlacement) {
	const match = FENPiecePlacement.match(/\w/g);
	const map = match.map(x => Number.isInteger(parseInt(x)) ? parseInt(x) : x );

	let i = 0;
	this.eachCoordinate(coordinate => { // TODO: try a index argument to keep track
		if ( Number.isInteger(map[i]) && map[i] > 0 ) {
			--map[i] <= 0 && i++;
		}
		else {
			this[coordinate].piece = this.pieceFactory[map[i]](this[coordinate]);
			i++;
		}
	});
};

Board.prototype.parseFEN = function(FENString) {
	let FENArray = FENString.split(' ', 6);

	if ( FENArray.length !== 6 ) {
		throw {
			name: 'FEN exception',
			message: 'Invalid FEN string',
			toString: () => `${this.name}: ${this.message}`
		};
	}

	return {
		piecePlacement: FENArray[0],
		activeColor: FENArray[1],
		castlingAvailability: FENArray[2],
		enPassant: FENArray[3],
		halfmoveClock: FENArray[4],
		fullmoveNumber: FENArray[5],
	};
};

Board.prototype.set = function(data) {
	this.engine.bestmove = 'e7e6';
	this.engine.ponder = 'b2b3';
};

Board.prototype.init = function(FENString) {
	FENString = FENString || this.startpos;
	let FEN = this.parseFEN(FENString);

	this.activeColor = FEN.activeColor;
	this.castlingAvailability = FEN.castlingAvailability;
	this.enPassant = FEN.enPassant;
	this.halfmoveClock = FEN.halfmoveClock;
	this.fullmoveNumber = FEN.fullmoveNumber;

	this.placePieces(FEN.piecePlacement);
};

module.exports = Board;