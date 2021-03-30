import API from './api/API';
import Board from './Board';
import Game from './Game';

export default class MariaChess {
	api: API;
	board: Board;
	games: Array<Game>;

	constructor() {
		this.board = new Board();
		this.games = [];
	}
}
