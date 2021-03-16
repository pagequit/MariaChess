import MariaChess from './MariaChess';
import { Piece } from './Board';

const maria: MariaChess = new MariaChess();

maria.board.load('8/7p/5p2/8/K1k5/8/8/r7 w - - 3 52');

console.log(maria.board);
