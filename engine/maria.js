class Piece {
	constructor(square, color, symbol = '?') {
		this.square = square;
		this.color = color;
		this.symbol = symbol;
	}

	get possibleMoves() {
		return 'foo';
	}
}

class Pawn extends Piece {
	constructor(square, color, symbol) {
		super(square, color, symbol);
	}

	// this function is ugly as ... u know ugly things look like
	get possibleMoves() {
		let possibleMoves = [];

		if ( this.square.board.enPassant ) {
			possibleMoves.push(this.square.board.enPassant);
		}

		if ( this.square.up && (this.square.up.piece === null) ) {
			possibleMoves.push(this.square.up);
		}

		if ( this.square.upRight && (this.square.upRight.piece && this.square.upRight.piece.color !== this.color) ) {
			possibleMoves.push(this.square.upRight);
		}

		if ( this.square.upLeft && (this.square.upLeft.piece && this.square.upLeft.piece.color !== this.color) ) {
			possibleMoves.push(this.square.upLeft);
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
		this.file = coordinate[0];
		this.rank = coordinate[1];
	}

	//getAdjacentSquare() {}

	// what happend if there is no square we looking for, while chaining?
	get up() {
		let index = this.board.ranks.indexOf(this.rank);
		let upAdjacentSquare = this.board[this.file + this.board.ranks[index + 1]];

		return upAdjacentSquare;

		// experimentel
		// this.board.ranks[this.rank];
	}

	get right() {
		let index = this.board.files.indexOf(this.file);
		let rightAdjacentSquare = this.board[this.board.files[index + 1] + this.rank];

		return rightAdjacentSquare;
	}

	get down() {
		let index = this.board.ranks.indexOf(this.rank);
		let downAdjacentSquare = this.board[this.file + this.board.ranks[index - 1]];

		return downAdjacentSquare;
	}

	get left() {
		let index = this.board.files.indexOf(this.file);
		let leftAdjacentSquare = this.board[this.board.files[index - 1] + this.rank];

		return leftAdjacentSquare;
	}

	get upRight() {
		return this.up ? this.up.right : undefined;
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

		this.XXX_eachCoordinate((coordinate, index) => {
			this[coordinate] = new Square(this, coordinate);
			this.squares[Math.floor(index / this.squares.length)].push(this[coordinate]);
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
		entries = entries.map(entry => Number.isInteger(parseInt(entry)) ? parseInt(entry) : entry );

		let index = 0;
		this.eachCoordinate(coordinate => {
			if ( Number.isInteger(entries[index]) && entries[index] > 0 ) {
				--entries[index] <= 0 && index++;
			}
			else {
				this[coordinate].piece = this.pieceFactory.createPiece(entries[index], coordinate);
				this.pieces[this[coordinate].piece.color].push(this[coordinate].piece);
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

	XXX_eachCoordinate(callback) {
		let index = 0;
		for ( let file in this.XXX_files) {
			for ( let rank in this.XXX_ranks) {
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