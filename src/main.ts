import MariaChess from './MariaChess';
import { Piece } from './Board';

const maria = new MariaChess();

maria.board.squares[1] = Piece.Black | Piece.Bishop;

console.log(Piece.GetColor(maria.board.squares[1]));
console.log(Piece.GetType(maria.board.squares[1]));
