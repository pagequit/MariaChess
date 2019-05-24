function UCICommand(engine) {
	this.engine = engine;
}

UCICommand.prototype.uci = function() {
	this.engine.ui.response.id();
};

UCICommand.prototype.ucinewgame = function() {
	this.engine.initNewGame();
};

UCICommand.prototype.isready = function() {
	this.engine.ui.response.readyok();
};

UCICommand.prototype.position = function(data) {
	this.engine.board.set(data);
};

UCICommand.prototype.go = function() {
	this.engine.ui.response.bestmove();
};

UCICommand.prototype.setoption = function(data) {
	console.log(`setoption: '${data}', received`);
};

UCICommand.prototype.quit = function() {
	this.engine.quit();
};

module.exports = UCICommand;