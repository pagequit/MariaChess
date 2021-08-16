import { expect, test } from '@jest/globals';
import Board from '../src/Board';

test('Bishop #1 [move]', () => {
	const board = new Board();
	board.load('8/8/8/8/8/8/6B1/8 w - - 0 1');

	[
		{ from: Board.coord.g2, to: Board.coord.h1 },
		{ from: Board.coord.g2, to: Board.coord.h3 },
		{ from: Board.coord.g2, to: Board.coord.f3 },
		{ from: Board.coord.g2, to: Board.coord.e4 },
		{ from: Board.coord.g2, to: Board.coord.d5 },
		{ from: Board.coord.g2, to: Board.coord.c6 },
		{ from: Board.coord.g2, to: Board.coord.b7 },
		{ from: Board.coord.g2, to: Board.coord.a8 },
		{ from: Board.coord.g2, to: Board.coord.f1 },
	].forEach(move => {
		expect(board.getMoves().some(m => {
			return JSON.stringify(m) === JSON.stringify(move)
		})).toBe(true);
	});
});
