'use strict';

class Board {
    constructor() {
        this.defaultFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
        this.squares = new Array(64);
    }
    parseFEN(FEN) { }
}
class Piece {
    static GetColor(piece) {
        return piece & 24;
    }
    static GetType(piece) {
        return piece & 7;
    }
}
Piece.None = 0;
Piece.Pawn = 1;
Piece.Knight = 2;
Piece.Bishop = 3;
Piece.Rook = 4;
Piece.Queen = 5;
Piece.King = 6;
Piece.White = 8;
Piece.Black = 16;

class MariaChess {
    constructor() {
        this.board = new Board();
    }
}

const maria = new MariaChess();
maria.board.squares[1] = Piece.Black | Piece.Bishop;
console.log(Piece.GetColor(maria.board.squares[1]));
console.log(Piece.GetType(maria.board.squares[1]));
