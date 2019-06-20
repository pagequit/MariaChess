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
		let possibleMoves = [];
		let dRight = `${this.direction}Right`;
		let dLeft = `${this.direction}Left`;

		if ( this.square[this.direction] && not(this.square[this.direction].piece) ) {
			possibleMoves.push(this.square[this.direction]);
		}

		if (
			this.square[dRight] &&
			this.square[dRight].piece &&
			this.square[dRight].piece.color !== this.color ||
			this.square[dRight] === this.square.board.enPassant
		) {
			possibleMoves.push(this.square[dRight]);
		}

		if (
			this.square[dLeft] &&
			this.square[dLeft].piece &&
			this.square[dLeft].piece.color !== this.color ||
			this.square[dLeft] === this.square.board.enPassant
		) {
			possibleMoves.push(this.square[dLeft]);
		}

		return possibleMoves;
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

	// this function is also ugly as ugly things look like
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
		return this.board.squares[this.fileIndex][this.rankIndex + 1];
	}

	get right() {
		return this.board.squares[this.fileIndex + 1] ? this.board.squares[this.fileIndex + 1][this.rankIndex] : undefined; // <-- is ugly
	}

	get down() {
		let index = this.board.ranks.indexOf(this.rank);
		let downAdjacentSquare = this.board[this.file + this.board.ranks[index - 1]];

		return downAdjacentSquare;
	}

	get left() {
		return this.board[this.board.files[this.fileIndex - 1] + this.rank]; // <-- this is how it should work well :) [time to sleep...]
	}

	get upRight() {
		return this.board.squares[this.fileIndex + 1][this.rankIndex + 1]; // <-- causes an error on the edges
	}

	get upLeft() {
		return this.up ? this.up.left : undefined;
	}

	get downRight() {
		return this.down ? this.down.right : undefined;
	}

	get downLeft() {
		return this.down ? this.down.left : undefined;
	}
}


class Board {
	constructor(engine) {
		this.engine = engine;
		this.files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
		this.ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
		this.file = {};
		this.rank = {};

		this.XXX_files = {
			a: [],
			b: [],
			c: [],
			d: [],
			e: [],
			f: [],
			g: [],
			h: [],
		};

		this.XXX_ranks = {
			1: [],
			2: [],
			3: [],
			4: [],
			5: [],
			6: [],
			7: [],
			8: [],
		};

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

		/*
		 * this.squares[0][0] == this.a1
		 * this.squares[1][0] == this.b1
		 * this.squares[1][1] == this.b2
		 */
		this.squares = [
			[],
			[],
			[],
			[],
			[],
			[],
			[],
			[],
		];

		// create the squares
		this.XXX_eachCoordinate((coordinate, index) => {
			let square = new Square(this, coordinate);
			this[coordinate] = square;
			this.squares[Math.floor(index / this.squares.length)].push(square);
			this.XXX_files[coordinate[0]].push(square);
			this.XXX_ranks[coordinate[1]].push(square);
		});

		// fill the file property
		this.files.forEach(file => {
			this.file[file] = this.squares.reduce((accumulator, square) => {
				if ( square.file === file ) {
					accumulator.push(square);
				}

				return accumulator;
			}, []);
		});

		// fill the rank property
		this.ranks.forEach(rank => {
			this.rank[rank] = this.squares.reduce((accumulator, square) => {
				if ( square.rank === rank ) {
					accumulator.push(square);
				}

				return accumulator;
			}, []);
		});

		this.pieceFactory = new PieceFactory(this);
	}

	placePieces(FENPiecePlacement) {
		let entries = FENPiecePlacement.match(/\w/g);
		entries = entries.map(entry => Number.isInteger(parseInt(entry)) ? parseInt(entry) : entry);

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
		for ( let r = this.ranks.length - 1; r >= 0; r-- ) {
			for ( let f = 0; f < this.files.length; f++ ) {
				callback(this.files[f] + this.ranks[r]);
			}
		}
	}

	eachCoordinateFEN(callback) {
		let ranks = [];
		for ( let rank in this.XXX_ranks ) {
			ranks.push(rank);
		}
		ranks.reverse();

		ranks.forEach(rank => {
			for ( let file in this.XXX_files ) {
				callback(file + rank);
			}
		});
	}

	XXX_eachCoordinate(callback) {
		let index = 0;

		for ( let file in this.XXX_files ) {
			for ( let rank in this.XXX_ranks ) {
				callback(file + rank, index++);
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