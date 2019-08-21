function not(arg) {
	return !arg;
}

class Piece {
	constructor(square, color, symbol = '?') {
		this.square = square;
		this.color = color;
		this.symbol = symbol;
	}

	get possibleMoves() {
		return undefined;
	}
}

class Pawn extends Piece {
	constructor(square, color, symbol) {
		super(square, color, symbol);

		this.direction = this.getDirection(color);
	}

	getDirection(color) {
		const directions = {
			w: 'up',
			b: 'down',
		};

		return directions[color];
	}

	get possibleMoves() {
		let moveSet = {
			origin: this.square,
			targets: [],
		};

		let dRight = `${this.direction}Right`;
		let dLeft = `${this.direction}Left`;

		if ( this.square[this.direction] && not(this.square[this.direction].piece) ) {
			moveSet.targets.push(this.square[this.direction]);
		}

		if (
			this.square[dRight] &&
			this.square[dRight].piece &&
			this.square[dRight].piece.color !== this.color ||
			this.square[dRight] === this.square.board.enPassant
		) {
			moveSet.targets.push(this.square[dRight]);
		}

		if (
			this.square[dLeft] &&
			this.square[dLeft].piece &&
			this.square[dLeft].piece.color !== this.color ||
			this.square[dLeft] === this.square.board.enPassant
		) {
			moveSet.targets.push(this.square[dLeft]);
		}

		return moveSet;
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

	get possibleMoves() {
		let possibleMoves = [];

		let currentUp = this.square.up;
		while ( currentUp != undefined ) {
			possibleMoves.push(currentUp);
			currentUp = currentUp.up;
		}

		let currentRight = this.square.right;
		while ( currentRight != undefined ) {
			possibleMoves.push(currentRight);
			currentRight = currentRight.right;
		}

		let currentDown = this.square.down;
		while ( currentDown != undefined ) {
			possibleMoves.push(currentDown);
			currentDown = currentDown.up;
		}

		let currentLeft = this.square.left;
		while ( currentLeft != undefined ) {
			possibleMoves.push(currentLeft);
			currentLeft = currentLeft.left;
		}

		return possibleMoves;
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
		const blueprints = {
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
		this.file = coordinate[0];
		this.rank = coordinate[1];
		this.fileIndex = board.files.indexOf(this.file);
		this.rankIndex = board.ranks.indexOf(this.rank);
		this.piece = null;
	}

	get up() {
		return this.board[this.file + this.board.ranks[this.rankIndex + 1]];
	}

	get right() {
		return this.board[this.board.files[this.fileIndex + 1] + this.rank];
	}

	get down() {
		return this.board[this.file + this.board.ranks[this.rankIndex - 1]];
	}

	get left() {
		return this.board[this.board.files[this.fileIndex - 1] + this.rank];
	}

	get upRight() {
		return this.board[this.board.files[this.fileIndex + 1] + this.board.ranks[this.rankIndex + 1]];
	}

	get upLeft() {
		return this.board[this.board.files[this.fileIndex - 1] + this.board.ranks[this.rankIndex + 1]];
	}

	get downRight() {
		return this.board[this.board.files[this.fileIndex + 1] + this.board.ranks[this.rankIndex - 1]];
	}

	get downLeft() {
		return this.board[this.board.files[this.fileIndex - 1] + this.board.ranks[this.rankIndex - 1]];
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

		this.eachCoordinate(coordinate => {
			this[coordinate] = new Square(this, coordinate);
		});

		this.pieceFactory = new PieceFactory(this);
	}

	placePieces(FENPiecePlacement) {
		let entries = FENPiecePlacement
			.match(/\w/g)
			.map(entry => Number.isInteger(parseInt(entry)) ? parseInt(entry) : entry)
		;

		let index = 0;
		this.eachCoordinateFEN(coordinate => {
			if ( Number.isInteger(entries[index]) && entries[index] > 0 ) {
				--entries[index] <= 0 && index++;
			}
			else {
				let piece = this.pieceFactory.createPiece(entries[index], coordinate);
				this[coordinate].piece = piece;
				this.pieces[this[coordinate].piece.color].push(piece);
				index++;
			}
		});
	}

	eachCoordinate(callback) {
		for ( let r = 0; r < this.ranks.length; r++ ) {
			for ( let f = 0; f < this.files.length; f++ ) {
				callback(this.files[f] + this.ranks[r]);
			}
		}
	}

	eachCoordinateFEN(callback) {
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
		this.enPassant = board.enPassant === '-' ? null : this[board.enPassant];
		this.castlingAvailability = board.castlingAvailability;
		this.activeColor = board.activeColor;

		this.placePieces(board.piecePlacement);
	}
}


class MoveGenerator {
	constructor(board) {
		this.board = board;
	}

	getMoveList(color) {
		let list = [];
		this.board.pieces[color].forEach(piece => {
			list.push({
				[piece.symbol]: piece.possibleMoves
			});
		});

		return list;
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
		let list = this.moveGenerator.getMoveList(this.board.activeColor);
		list;
	}
}

const maria = new Engine();
maria.init();
console.log(maria);
