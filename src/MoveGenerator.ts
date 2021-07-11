import Board from "./Board";
import Moves from "./interfaces/Moves";
import Move from "./Move";

export default class MoveGenerator {
	board: Board;

	constructor(board: Board) {
		this.board = board;
	}

	getMoves(iterations: number) {
		while (iterations-- > 0) {
			for (let i = 0; i < this.board.squares.length; i++) {
				console.log(this.board.squares[i]);
			}
		}
	}
}
