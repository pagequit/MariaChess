import MariaChess from './MariaChess';
import Board, { Piece } from './Board';

const maria: MariaChess = new MariaChess();

try {
	maria.board.load('rnbqkbnr/ppppp1pp/8/8/4Pp2/5P2/PPPP2PP/RNBQKBNR b KQkq e3 0 1');
}
catch (error) {
	console.error(error);
}

console.log(maria.board.toFEN());
