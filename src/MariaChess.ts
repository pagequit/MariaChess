import Board from './Board';

export default class MariaChess {
	board: Board;

	constructor() {
		this.board = new Board();
	}
}
