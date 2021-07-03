import MariaChess from '../MariaChess';
import CLI from './CLI';
import LichessAPI from './LichessAPI';
import UCIUtility from '../UCIUtility';
import Board from '../Board';
import Piece from '../Piece';

const Events = require('events');


/*
 * TODO: think about
 * maria.api.cli || maria.cli
 * maria.api.lichessApi || maria.lichessApi
 * maria.gingerBot ?!
 */

export default class API extends Events {
	maria: MariaChess;
	cli: CLI;
	lichessAPI: LichessAPI;

	constructor(maria: MariaChess) {
		super();
		this.maria = maria;
		this.cli = new CLI();
		this.lichessAPI = new LichessAPI();
	}

	mount() {
		this.on('newGame', this.newGame);
		this.on('nextMove', this.nextMove);
		this.on('drawOffer', this.declineDraw);

		this.cli.mount(this);
	}

	newGame(FEN?: string): void {
		setImmediate(() => {
			if (FEN) {
				try {
					this.maria.board.load(FEN);
				}
				catch(error) {
					console.error(error);
				}
			}
			else {
				this.maria.board.reset();
			}
			console.log(this.maria.board.toFEN());
		});
	}

	nextMove(move: string) {

		// TODO: Make a Move Object!
		// TODO: Validate move!
		// TODO: Keep track of the moves!

		let promotion = UCIUtility.moveIsPromotion(move)
			? UCIUtility.moveGetPromotion(move)
			: null;

		if (promotion) {
			// do promotion stuff;
		}

		const from = UCIUtility.moveFrom(move);
		const to = UCIUtility.moveTo(move);

		const piece = this.maria.board.squares[Board.coord[from]];
		this.maria.board.squares[Board.coord[from]] = null;
		this.maria.board.squares[Board.coord[to]] = piece;

		console.log(this.maria.board.toFEN());
	}

	makeMove(gameId: string, move: string) {

	}

	offerDraw(gameId: string) {

	}

	acceptDraw(gameId: string) {

	}

	declineDraw(gameId: string) {

	}

	resignGame(gameId: string) {

	}

	abortGame(gameId: string) {

	}
}
