// ???
function Piece(square) {
	this.square = square;
}

function Square(coordinate) {
	this.coordinate = coordinate;
	this.piece = null;
}


Board.prototype.placePieces = function(FENPiecePlacement) {
	const match = FENPiecePlacement.match(/\w/g);
	const map = match.map(x => Number.isInteger(parseInt(x)) ? parseInt(x) : x );

	let i = 0;
	this.eachCoordinate(coordinate => {
		if ( Number.isInteger(map[i]) && map[i] > 0 ) {
			--map[i] <= 0 && i++;
		}
		else {
			this[coordinate].piece = map[i];
			i++;
		}
	});
};


function Board() {
	this.startpos = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
	this.activeColor = null;
	this.castlingAvailability = null;
	this.enPassant = null;
	this.halfmoveClock = null;
	this.fullmoveNumber = null;
	this.moveHistory = [];

	this.eachCoordinate(coordinate => {
		this[coordinate] = new Square(coordinate);
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