/* Maria
 *
 * A low weight chess engine
 *
 * Author: PageQuit Entertainmanet
 * Licence: MIT
 */

(function( Maria ) {
	Maria.Color = {
		White: 0,
		Black: 1,
		decode: (color) => {
			switch (color) {
				case Maria.Color.White:
					return 'white';
				case Maria.Color.Black:
					return 'black';
				default:
					return 'undefined color'
			}
		}
	}

	Maria.Type = {
		Pawn: 0,
		Knight: 1,
		Bishop: 2,
		Rook: 3,
		Queen: 4,
		King: 5,
		decode: (type) => {
			switch (type) {
				case Maria.Type.Pawn:
					return 'Pawn';
				case Maria.Type.Knight:
					return 'Knight';
				case Maria.Type.Bishop:
					return 'Bishop';
				case Maria.Type.Rook:
					return 'Rook';
				case Maria.Type.Queen:
					return 'Queen';
				case Maria.Type.King:
					return 'King';
				default:
					return 'undefined type'
			}
		}
	}


	class Delegate {
		add(object, methodName) {
			this.hooks.push({
				object: object,
				methodName: methodName
			});
		}

		invoke(args) {
			this.hooks.forEach(hook => {
				if ( typeof hook.object[hook.methodName] !== 'function' ) {
					console.error(`DelegateTypeError: ${hook.methodName} is not a function`);
				}
				else {
					hook.object[hook.methodName](args);
				}
			});
		}

		constructor() {
			this.hooks = [];
		}
	}


  class Move {
    constructor(board, originSquare, targetSquare) {
      this.board = board;
      this.originSquare = originSquare;
      this.targetSquare = targetSquare;
			this.isValid = false;
    }
  }


	class Piece {
		constructor(color, type) {
			this.color = color;
			this.type = type;
			this.moved = 0;
		}

		moveTo(targetSquare) {
			targetSquare.piece = this;
		}
	}


	class Square {
		setNewPiece(color, type) {
			this.piece = new Piece(color, type);
		}

		movePieceTo(targetCoordinate) {
      let board = this.board;
      let originSquare = this.board[this.coordinate];
      let targetSquare = this.board[targetCoordinate];

			let move = new Move(board, originSquare, targetSquare);

			try {
				this.board.preMoveHooks.invoke(move);

				this.piece.moved++;
				this.board[targetCoordinate].piece = this.piece;
				this.piece = null;
			}
			catch(error) {
				console.error(`MoveingError: ${this.coordinate}-${targetCoordinate} aborted for following reason:`, error);
			}

      this.board.postMoveHooks.invoke(move);
		}

		constructor(board, coordinate) {
			this.board = board;
			this.coordinate = coordinate;
			this.piece = null;
		}
	}


	class ChessBoard {
		createSquare(row, file) {
			let coordinate = file + row;
			this[coordinate] = new Square(this, coordinate);
		}

		buildSquares() {
			for ( let i = 0; i < 8; i++ ) {
				let file = String.fromCharCode('a'.charCodeAt(0) + i)
				for ( let j = 0; j < 8; j++ ) {
					let row = String.fromCharCode('1'.charCodeAt(0) + j)
					this.createSquare(row, file);
				}
			}
		}

		constructor() {
			this.buildSquares();
			this.preMoveHooks = new Delegate();
			this.postMoveHooks = new Delegate();
		}
	}


	class MoveRule {
		checkMovement() {
			console.log('checking movement...');
			
			return false;
		}

		validateMove(board) {
			let isValid = false;
			isValid = this.checkMovement();

			return isValid;
		}

		constructor() {
		}
	}


	class PawnRule extends MoveRule {
		validateMove(move) {
			console.log(`I'm just a ${Maria.Color.decode(move.originSquare.piece.color)} Pawn sitting on ${move.originSquare.coordinate}.`);

			return true;
		}

		defineMovement() {

		}
	}


	class Referee {
		checkMove(move) {
			let piece = move.originSquare.piece;
			let targetPiece = move.targetSquare.piece;

			if ( piece === null ) {
				throw `no piece at ${move.originSquare.coordinate}`;
			}

      let type = Maria.Type.decode(piece.type);

      move.isValid = this.rules[type].validateMove(move);

			if ( move.isValid ) {
				this.moveCount++;
			}

			console.log(`Moved: ${Maria.Color.decode(piece.color)} ${Maria.Type.decode(piece.type)}` );
			if ( targetPiece !== null ) {
				console.log(`Captured: ${Maria.Color.decode(targetPiece.color)} ${Maria.Type.decode(targetPiece.type)}` );
			}
		}

		logMove(move) {
			console.log(`${++this.moveCount}. ${move.originSquare.coordinate}-${move.targetSquare.coordinate}`);
		}

		newGame(board) {
			board.a1.setNewPiece(Maria.Color.White, Maria.Type.Rook);
			board.b1.setNewPiece(Maria.Color.White, Maria.Type.Knight);
			board.c1.setNewPiece(Maria.Color.White, Maria.Type.Bishop);
			board.d1.setNewPiece(Maria.Color.White, Maria.Type.Queen);
			board.e1.setNewPiece(Maria.Color.White, Maria.Type.King);
			board.f1.setNewPiece(Maria.Color.White, Maria.Type.Bishop);
			board.g1.setNewPiece(Maria.Color.White, Maria.Type.Knight);
			board.h1.setNewPiece(Maria.Color.White, Maria.Type.Rook);

			for ( let i = 0; i < 8; i++ ) {
				board[`${String.fromCharCode('a'.charCodeAt(0) + i)}2`].setNewPiece(Maria.Color.White, Maria.Type.Pawn);
			}

			board.a8.setNewPiece(Maria.Color.Black, Maria.Type.Rook);
			board.b8.setNewPiece(Maria.Color.Black, Maria.Type.Knight);
			board.c8.setNewPiece(Maria.Color.Black, Maria.Type.Bishop);
			board.d8.setNewPiece(Maria.Color.Black, Maria.Type.Queen);
			board.e8.setNewPiece(Maria.Color.Black, Maria.Type.King);
			board.f8.setNewPiece(Maria.Color.Black, Maria.Type.Bishop);
			board.g8.setNewPiece(Maria.Color.Black, Maria.Type.Knight);
			board.h8.setNewPiece(Maria.Color.Black, Maria.Type.Rook);

			for ( let i = 0; i < 8; i++ ) {
				board[`${String.fromCharCode('a'.charCodeAt(0) + i)}7`].setNewPiece(Maria.Color.Black, Maria.Type.Pawn);
			}

			for ( let row = 3; row < 7; row++ ) {
				for ( let i = 0; i < 8; i++ ) {
					board[`${String.fromCharCode('a'.charCodeAt(0) + i)}${row}`].piece = null;
				}
			}

			this.moveCount = 0;
		}

		constructor() {
			this.moveCount = 0;
			this.rules = {
				Pawn: new PawnRule(),
			}
		}
	}


	Maria.createNewChessBoard = () => {
		return new ChessBoard();
	}


	Maria.createNewChessReferee = () => {
		return new Referee();
	}

}( window.Maria = window.Maria || {} ));

