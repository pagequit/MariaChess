function UCICommand(engine) {
	this.engine = engine;
}

UCICommand.prototype.uci = function(data) {
	this.engine.ui.response.id();
}

UCICommand.prototype.isready = function(data) {
	// do some engineis stuff
	this.engine.ui.response.readyok();
}

UCICommand.prototype.setoption = function(data) {
	console.log(`setoption: '${data}', received`);
}

UCICommand.prototype.quit = function() {
	this.engine.quit();
}

module.exports = UCICommand;