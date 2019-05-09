function UCIResponse(engine) {
	this.engine = engine;
}

UCIResponse.prototype.id = function() {
	console.log(`id name ${this.engine.name} ${this.engine.version}`);
	console.log(`id author ${this.engine.author}`);
	console.log('no options available yet');
	this.uciok();
};

UCIResponse.prototype.uciok = function() {
	console.log('uciok');
};

UCIResponse.prototype.readyok = function() {
	console.log('readyok');
};

UCIResponse.prototype.bestmove = function() {
	console.log(`bestmove ${this.engine.bestmove} ponder ${this.engine.ponder}`);
};

module.exports = UCIResponse;