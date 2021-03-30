import MariaChess from '../MariaChess';
import GameEvents from '../interfaces/GameEvents';

const EventEmitter = require('events');


export default abstract class API extends EventEmitter implements GameEvents {
	maria: MariaChess;

	constructor(maria: MariaChess) {
		super();

		this.maria = maria;

		this.on('newGame', this.newGame.bind(this));
	}

	newGame(FEN?: string): void {
		console.log(FEN);
		console.log(this.maria);
	}
}
