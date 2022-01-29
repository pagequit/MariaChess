import Board from "./Board";
import Move from "./Move";

export default class Game {
	board: Board;
	data: any; // TODO: specify
	moves: Move[];

	constructor(board: Board, data: any) {
		this.board = board;
		this.data = data;
		this.moves = [];
	}

	toPGN(): String {
		return 'PGN';
	}
}
