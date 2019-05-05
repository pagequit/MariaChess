const readline = require('readline');
const UCICommand = require('./UCICommand');


function UniversalChessInterface(engine) {
	this.engine = engine;
	this.command = new UCICommand(this.engine);
	this.readlineInterface = null;
}

UniversalChessInterface.prototype.open = function() {
	this.readlineInterface = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	this.readlineInterface.on('line', this.process.bind(this));
}

UniversalChessInterface.prototype.close = function() {
	this.readlineInterface.close();
}

UniversalChessInterface.prototype.execute = function(request) {
	this.command[request.command](request.data);
}

UniversalChessInterface.prototype.parse = function(input) {
	return {
		command: input,
		data: input,
	}
}

UniversalChessInterface.prototype.process = function(input) {
	const request = this.parse(input);
	try {
		this.execute(request);
	}
	catch (e) {
		console.error(e);
	}
}


module.exports = UniversalChessInterface;