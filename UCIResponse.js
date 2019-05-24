function UCIResponse(engine) {
	this.engine = engine;
}

UCIResponse.prototype.id = function() {
	console.log(`id name ${this.engine.name} ${this.engine.version}`);
	this.engine.ui.log(`id name ${this.engine.name} ${this.engine.version}`);
	console.log(`id author ${this.engine.author}`);
	this.engine.ui.log(`id author ${this.engine.author}`);
	console.log('no options available yet');
	this.engine.ui.log('no options available yet');
	this.uciok();
};

UCIResponse.prototype.uciok = function() {
	console.log('uciok');
	this.engine.ui.log('uciok');
};

UCIResponse.prototype.info = function() {
	console.log('info "I will crash soon..."');
	this.engine.ui.log('info "I will crash soon..."');
};

UCIResponse.prototype.readyok = function() {
	console.log('readyok');
	this.engine.ui.log('readyok');
};

UCIResponse.prototype.bestmove = function() {
	console.log(`bestmove ${this.engine.bestmove} ponder ${this.engine.ponder}`);
	this.engine.ui.log(`bestmove ${this.engine.bestmove} ponder ${this.engine.ponder}`);
};

module.exports = UCIResponse;