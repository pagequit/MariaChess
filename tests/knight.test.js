import { expect, test } from '@jest/globals';
import Board from '../src/Board';

test('Kight #1 [move]', () => {
	const board = new Board();
	board.load('8/8/8/8/8/4N3/8/8 w - - 0 1');

	expect(board.getMoves().length).toEqual(8);
	expect(board.getMoves().filter(m => {
		return m === Board.coord.d5
			|| Board.coord.f5
			|| Board.coord.c4
			|| Board.coord.g4
			|| Board.coord.c2
			|| Board.coord.g2
			|| Board.coord.d1
			|| Board.coord.f1;
	}).length).toEqual(8);

	board.load('8/8/8/8/8/8/6N1/8 w - - 0 1');

	expect(board.getMoves().length).toEqual(4);
	expect(board.getMoves().filter(m => {
		return m === Board.coord.e3
			|| Board.coord.f4
			|| Board.coord.h4
			|| Board.coord.e2;
	}).length).toEqual(4);

	board.load('N7/8/8/8/8/8/8/8 w - - 0 1');

	expect(board.getMoves().length).toEqual(2);
	expect(board.getMoves().filter(m => {
		return m === Board.coord.b6
			|| Board.coord.c7;
	}).length).toEqual(2);
});

test('Kight #2 [capture]', () => {
	const board = new Board();
	board.load('N7/8/1p6/8/8/8/8/8 w - - 0 1');

	expect(board.getMoves().length).toEqual(2);
	expect(board.getMoves().filter(m => {
		return m === Board.coord.b6
			|| Board.coord.c7;
	}).length).toEqual(2);
});

test('Kight #3 [blocked]', () => {
	const board = new Board();
	board.load('N7/1p6/1P6/8/8/8/8/8 w - - 0 1');

	expect(board.getMoves().length).toEqual(1);
	expect(board.getMoves().filter(m => {
		return m === Board.coord.c7;
	}).length).toEqual(1);
});
