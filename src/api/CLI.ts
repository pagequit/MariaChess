import { ReadLine } from 'node:readline';
import API from './API';

const readline = require('readline');

interface Actions {
	[name: string]: Function,
}


export default class CLI {
	rl: ReadLine;
	actions: Actions;
	api: API;

	constructor() {
		this.rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		this.actions = {
			quit: this.quit.bind(this),
			newGame: this.newGame.bind(this),
			nextMove: this.nextMove.bind(this),
		}
	}

	mount(api: API) :void {
		this.api = api;
		this.rl.on('line', this.parseMessage.bind(this));
	}

	parseAction(message: string): Promise<Array<string>> {
		return new Promise((resolve, reject) => {
			const messageChunks = message.split(/\s+/g);

			typeof this.actions[messageChunks[0]] === 'function'
				? resolve(messageChunks)
				: reject(`Unknown action: ${messageChunks[0]}`);
		});
	}

	parseMessage(message: string): void {
		this.parseAction(message).then(messageChunks => {
			const action = messageChunks.shift();
			this.actions[action](messageChunks);
		}).catch(error => {
			console.error(error);
		});
	}

	quit(args: Array<string>): void {
		this.rl.close();
	}

	newGame(args: Array<string>): void {
		const FEN = args.join(' ');
		this.api.emit('newGame', FEN);
	}

	nextMove(args: Array<string>): void {
		const move = args[0];
		this.api.emit('nextMove', move);
	}
}
