const fs = require('fs');
const readline = require('readline');
const UCICommand = require('./UCICommand');
const UCIResponse = require('./UCIResponse');


function UniversalChessInterface(engine) {
	this.engine = engine;
	this.command = new UCICommand(this.engine);
	this.response = new UCIResponse(this.engine);
	this.readlineInterface = null;
}

UniversalChessInterface.prototype.open = function() {
	this.readlineInterface = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	this.readlineInterface.on('line', this.process.bind(this));
};

UniversalChessInterface.prototype.close = function() {
	this.readlineInterface.close();
};

UniversalChessInterface.prototype.execute = function(request) {
	this.command[request.command](request.data);
};

UniversalChessInterface.prototype.log = function(data) {
	fs.appendFile('log', `${data}\n`, (err) => {
		if (err) {
			throw err;
		}
	});
};

UniversalChessInterface.prototype.parse = function(input) {
	const match = input.match(/(\S+)/g);
	const command = match.shift();

	return {
		command: command,
		data: match
	};
};

UniversalChessInterface.prototype.process = function(input) {
	this.log(input);
	const request = this.parse(input);
	try {
		this.execute(request);
	}
	catch (err) {
		this.log(err);
	}
};

module.exports = UniversalChessInterface;