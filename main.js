const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

function terminate() {
	console.log('Bye');
	rl.close();
}

function print(input) {
	console.log(`Received: ${input}`);
}

function main(input) {

	// TODO: find a solution
	// FIXME: don't use the eventhandler as main-loop
	console.log('Ill become printed "on line"')

	if ( input === 'quit' ) {
		terminate();
	}
	else {
			print(input);
	}
}

console.log('Type "quit" to terminate.')
rl.on('line', main);