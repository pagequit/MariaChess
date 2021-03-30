import Board from "./Board";

export default class Game {
	board: Board;
	data: any;

	constructor(board: Board, data: any) {
		this.board = board;
		this.data = data;
	}
}
