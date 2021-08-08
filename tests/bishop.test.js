import { expect, test } from '@jest/globals';
import Board from '../src/Board';

test('Bishop #1 [move]', () => {
	const board = new Board();
	board.load('8/8/8/8/8/8/6B1/8 w - - 0 1');

	board.getMoves().forEach(m => console.log(Board.SquareToAlgebraic(m)));

	expect(board.getMoves().length).toEqual(9);
	expect(board.getMoves().filter(m => {
		return m === Board.coord.h1
			|| Board.coord.h3
			|| Board.coord.f3
			|| Board.coord.e4
			|| Board.coord.d5
			|| Board.coord.c6
			|| Board.coord.b7
			|| Board.coord.a8
			|| Board.coord.f1;
	}).length).toEqual(9);

	// TODO: Improve the testing... it doesn't work with duplicate entries >.<
});
