// TODO: FEN
// TODO: PGN
// TODO: delegate for the interfaces

const UniversalChessInterface = require('./UCI');

function Maria() {
	this.ui = new UniversalChessInterface(this);
}

Maria.prototype.run = function() {
	this.ui.open();
}

Maria.prototype.quit = function() {
	this.ui.close();
	console.log('Bye');

	process.exit(0);
}


module.exports = Maria;