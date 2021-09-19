import { ReadLine } from 'node:readline';
import API from './API';
import Board from '../Board';

interface Actions {
	[name: string]: Function,
}

export default class CLI {
	rl: ReadLine;
	actions: Actions;
	api: API;
	id: string;

	constructor(api: API) {
		this.rl = require('readline').createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		this.actions = {
			quit: this.quit.bind(this),
			newGame: this.newGame.bind(this),
			nextMove: this.nextMove.bind(this),
			printMoves: this.printMoves.bind(this),
		}

		this.id = require('crypto').randomBytes(4).toString('hex');
		this.api = api;
	}

	mount() :void {
		this.rl.on('line', this.parseMessage.bind(this));
	}

	parseAction(message: string): Promise<Array<string>> {
		return new Promise((resolve, reject) => {
			const messageChunks: Array<string> = message.split(/\s+/g);

			typeof this.actions[messageChunks[0]] === 'function'
				? resolve(messageChunks)
				: reject(`Unknown action: ${messageChunks[0]}`);
		});
	}

	parseMessage(message: string): void {
		this.parseAction(message).then(messageChunks => {
			const action: string = messageChunks.shift();
			this.actions[action](messageChunks);
		}).catch(error => {
			console.error(error);
		});
	}

	quit(): void {
		this.rl.close();
	}

	newGame(args: Array<string>): void {
		const FEN: string = args.join(' ');
		this.api.emit('newGame', this.id, FEN);
	}

	nextMove(args: Array<string>): void {
		const move: string = args[0];
		this.api.emit('nextMove', this.id, move);
	}

	printMoves(): void {
		const board: Board = this.api.maria.games.get(this.id).board;

		board.moveGen.getSimpleMoves().forEach((move) => {
			console.log(Board.SquareToAlgebraic(move.from) + Board.SquareToAlgebraic(move.to));
		});
	}
}
