// TODO: FEN
// TODO: PGN
const UniversalChessInterface = require('./UCI');


function Maria() {
	this.name = 'MariaChess';
	this.version = '0.0.1';
	this.author = 'Christian Klihm';
	this.bestmove = null;
	this.ponder = null;
	this.ui = new UniversalChessInterface(this);
}

Maria.prototype.start = function() {
	this.ui.open();
}

Maria.prototype.quit = function() {
	this.ui.close();
	console.log('Bye');

	process.exit(0);
}

module.exports = Maria;