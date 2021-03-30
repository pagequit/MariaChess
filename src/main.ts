import MariaChess from './MariaChess';
import Board from './Board';
import Piece from './Piece';
import Game from './Game';
import CLI from './api/CLI';

const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
 });


const maria: MariaChess = new MariaChess();

try {
	maria.board.load('rnbqkbnr/ppppp1pp/8/8/4Pp2/5P2/PPPP2PP/RNBQKBNR b KQkq e3 0 1');
}
catch (error) {
	console.error(error);
}

// maria.api.on('newGame', (data: any) => {
// 	// just do only one game at a time for now
// 	if (maria.games.length > 0) {
// 		throw new Error('Error: Another game is still open!');
// 	}

// 	console.log(data);

// 	maria.games.push(new Game(maria.board, data)); // !maria.board -> new Board(?FEN)
// });



function waitForUserInput() {
	rl.question('> ', (answer: string) => {
		if (['exit', 'quit', 'q'].includes(answer)) {
				rl.close();
		} else {
				waitForUserInput();
		}
	});
}

switch (process.argv[2]) {
	case 'lichess':
		break;
	case 'cli':
	default:
		waitForUserInput();
		maria.api = new CLI(maria);
		maria.api.emit('newGame', 'PGN');

}
