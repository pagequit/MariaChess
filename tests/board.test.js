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

test('Pawn #1 [move]', () => {
	const board = new Board();
	board.load('4k3/8/8/8/8/8/4P3/4K3 w - f6 0 1');

	expect(board.getMoves().length).toEqual(2);
	expect(board.getMoves().filter(m => {
		return m === Board.coord.e3 || Board.coord.e4;
	}).length).toEqual(2);

	board.load('4k3/8/8/8/4p3/8/4P3/4K3 w - f6 0 1');

	expect(board.getMoves().length).toEqual(1);
	expect(board.getMoves().filter(m => {
		return m === Board.coord.e3;
	}).length).toEqual(1);

	board.load('4k3/8/8/8/8/4P3/8/4K3 w - f6 0 1');

	expect(board.getMoves().length).toEqual(1);
	expect(board.getMoves().filter(m => {
		return m === Board.coord.e4;
	}).length).toEqual(1);

	// TODO: Find out why in hell this test doesn't pass with the original board! (passes with new Board())
	board.load('4k3/8/8/8/8/4p3/4P3/4K3 w - f6 0 1');

	expect(board.getMoves().length).toEqual(0);
});

test('Pawn #2 [capture]', () => {
	const board = new Board();
	board.load('4k3/8/8/8/3p1p2/4P3/8/4K3 w - f6 0 1');

	expect(board.getMoves().length).toEqual(3);
	expect(board.getMoves().filter(m => {
		return m === Board.coord.d4 || Board.coord.e4 || Board.coord.f4;
	}).length).toEqual(3);
});

test('Pawn #2 [en passant]', () => {
	const board = new Board();
	board.load('4k3/8/8/4Pp2/8/8/8/4K3 w - f6 0 1');

	expect(board.getMoves().length).toEqual(2);
	expect(board.getMoves().filter(m => {
		return m === Board.coord.f6 || Board.coord.e6;
	}).length).toEqual(2);
});

test('Pawn #3 [capture border left]', () => {
	const board = new Board();
	board.load('4k3/8/8/8/7n/pp6/P7/4K3 w - f6 0 1');

	expect(board.getMoves().length).toEqual(1);
	expect(board.getMoves().filter(m => {
		return m === Board.coord.b3;
	}).length).toEqual(1);
});

test('Pawn #4 (capture border right)', () => {
	const board = new Board();
	board.load('4k3/8/8/8/8/6pp/n6P/4K3 w - f6 0 1');

	expect(board.getMoves().length).toEqual(1);
	expect(board.getMoves().filter(m => {
		return m === Board.coord.g3;
	}).length).toEqual(1);
});
