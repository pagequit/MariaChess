import * as Events from 'node:events';
import MariaChess from '../MariaChess';
import CLI from './CLI';
import Board from '../Board';
import Game from '../Game';
import Move from '../Move';

/*
 * TODO: think about
 * maria.api.cli || maria.cli
 * maria.api.lichessApi || maria.lichessApi
 * maria.gingerBot ?!
 */

export default class API extends Events {
	maria: MariaChess;
	cli: CLI;

	constructor(maria: MariaChess) {
		super();
		this.maria = maria;
		this.cli = new CLI(this);
	}

	mount() {
		this.on('newGame', this.newGame);
		this.on('nextMove', this.nextMove);

		this.cli.mount();
	}

	newGame(gameId: string, FEN?: string): void {
		setImmediate(() => {
			this.maria.games.set(gameId, new Game(new Board(), 'data'));

			if (FEN) {
				try {
					this.maria.games.get(gameId).board.load(FEN);
				}
				catch(error) {
					console.error(error);
				}
			}
			else {
				this.maria.games.get(gameId).board.reset();
			}
			console.log(this.maria.games.get(gameId).board.toFEN());
		});
	}

	nextMove(gameId: string, move: string) {
		const board = this.maria.games.get(gameId).board;

		board.applyMove(new Move(board, move));

		console.log(board.toFEN());
	}

	makeMove(gameId: string, move: string) {
		// ...what again was the difference between makeMove and nextMove?
	}

	offerDraw(gameId: string) {
		// TODO
	}

	acceptDraw(gameId: string) {
		// TODO
	}

	declineDraw(gameId: string) {
		// TODO
	}

	resignGame(gameId: string) {
		// TODO
	}

	abortGame(gameId: string) {
		// TODO
	}
}
