import API from './api/API';
import Game from './Game';

export default class MariaChess {
	api: API;
	games: Map<string, Game>; // shuld be a collection or map

	constructor() {
		this.games = new Map();
		this.api = new API(this);
	}
}
