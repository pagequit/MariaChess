/*
TODO: FEN
rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1

TODO: PGN
[Event "IBM Kasparov vs. Deep Blue Rematch"]
[Site "New York, NY USA"]
[Date "1997.05.11"]
[Round "6"]
[White "Deep Blue"]
[Black "Kasparov, Garry"]
[Opening "Caro-Kann: 4...Nd7"]
[ECO "B17"]
[Result "1-0"]

1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Nd7 5.Ng5 Ngf6 6.Bd3 e6 7.N1f3 h6
8.Nxe6 Qe7 9.O-O fxe6 10.Bg6+ Kd8 {Kasparov schüttelt kurz den Kopf}
11.Bf4 b5 12.a4 Bb7 13.Re1 Nd5 14.Bg3 Kc8 15.axb5 cxb5 16.Qd3 Bc6
17.Bf5 exf5 18.Rxe7 Bxe7 19.c4 1-0

TODO: CQL ???
*/
const UniversalChessInterface = require('./UCI');


function Board(FENString) {
	this.startpos = FENString || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'; // ???
	//this.piecePlacement = ???
	this.activeColor = null;
	this.castlingAvailability = null;
	this.enPassant = null;
	this.halfmoveClock = null;
	this.fullmoveNumber = null;

	this.squares = [
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
	];
}

Board.prototype.parseFEN = function(FENString) {
	let FENArray = FENString.split(' ', 6);

	if ( FENArray.lenght !== 6 ) {
		throw {
			name: 'FEN exception',
			message: 'Invalid FEN string',
			toString: () => `${this.name}: ${this.message}`
		};
	}
	return FENArray;
};

Board.prototype.init = function() {
	this.parseFEN(this.startpos) // ???
}

function Maria() {
	this.name = 'MariaChess';
	this.version = '0.0.1';
	this.author = 'Christian Klihm';
	this.bestmove = null;
	this.ponder = null;
	this.ui = new UniversalChessInterface(this);
}

Maria.prototype.initNewGame = function() {

}

Maria.prototype.start = function() {
	this.ui.open();
};

Maria.prototype.quit = function() {
	this.ui.close();
	console.log('Bye');
};

module.exports = Maria;