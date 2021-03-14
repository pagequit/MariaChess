import MariaChess from './MariaChess';
import { Piece } from './Board';

const maria = new MariaChess();

maria.board.squares[1] = Piece.Black | Piece.Bishop;

maria.board.parseFEN(maria.board.defaultFEN);
