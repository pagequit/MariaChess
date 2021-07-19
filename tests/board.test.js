import { expect, test } from '@jest/globals';
import Board from '../src/Board';

const startposFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

test('FEN #1', () => {
	const board = new Board();
	board.reset();

	expect(board.toFEN()).toEqual(startposFEN);
});

test('FEN #2', () => {
	const testFEN = '4k3/4p3/8/5p2/5PP1/8/3P4/4K3 w - - 0 1';
	const board = new Board();
	board.load(testFEN);

	expect(board.toFEN()).toEqual(testFEN);

	board.reset();

	expect(board.toFEN()).toEqual(startposFEN);
});
