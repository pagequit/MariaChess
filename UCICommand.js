function UCICommand(engine) {
	this.engine = engine;
}

UCICommand.prototype.uci = function(data) {
	console.log(`uci: '${data}', received`);
}

UCICommand.prototype.isready = function(data) {
	console.log(`isready: '${data}', received`);
}

UCICommand.prototype.setoption = function(data) {
	console.log(`setoption: '${data}', received`);
}

UCICommand.prototype.quit = function() {
	this.engine.quit();
}


module.exports = UCICommand;