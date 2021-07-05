import Board from "./Board";
import Move from "./Move";

export default class Game {
	board: Board;
	data: any;
	moves: Array<Move>;

	constructor(board: Board, data: any) {
		this.board = board;
		this.data = data;
		this.moves = [];
	}
}
