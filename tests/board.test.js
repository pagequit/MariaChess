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

test('Moves #1', () => {
	const board = new Board();
	board.reset();

	expect(board.getMoves().length).toEqual(20);
});

test('En passant #1', () => {
	const board = new Board();
	board.load('4k3/8/8/4Pp2/8/8/8/4K3 w - f6 0 1');

	const f6 = 20;
	const e6 = 21;

	expect(board.getMoves().length).toEqual(2);
	expect(board.getMoves().filter(m => m === f6 || e6).length).toEqual(2);
});

test('Pawn capture #1', () => {
	const board = new Board();
	board.load('4k3/8/8/4Pp2/8/6pp/n6P/4K3 w - f6 0 1');

	const f6 = 20;
	const e6 = 21;
	const g3 = 45;

	expect(board.getMoves().length).toEqual(3);
	expect(board.getMoves().filter(m => m === f6 || e6 || g3).length).toEqual(3);
});
