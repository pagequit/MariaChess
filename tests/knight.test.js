import { expect, test } from '@jest/globals';
import Board from '../src/Board';

test('Kight #1 [move]', () => {
	const board = new Board();
	board.load('8/8/8/8/8/4N3/8/8 w - - 0 1');
	let moves = board.getMoves();

	[
		{ from: Board.coord.e3, to: Board.coord.d5 },
		{ from: Board.coord.e3, to: Board.coord.f5 },
		{ from: Board.coord.e3, to: Board.coord.c4 },
		{ from: Board.coord.e3, to: Board.coord.g4 },
		{ from: Board.coord.e3, to: Board.coord.c2 },
		{ from: Board.coord.e3, to: Board.coord.g2 },
		{ from: Board.coord.e3, to: Board.coord.d1 },
		{ from: Board.coord.e3, to: Board.coord.f1 },
	].forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});

	board.load('8/8/8/8/8/8/6N1/8 w - - 0 1');
	moves = board.getMoves();

	[
		{ from: Board.coord.g2, to: Board.coord.e3 },
		{ from: Board.coord.g2, to: Board.coord.f4 },
		{ from: Board.coord.g2, to: Board.coord.h4 },
		{ from: Board.coord.g2, to: Board.coord.e1 },
	].forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});

	board.load('N7/8/8/8/8/8/8/8 w - - 0 1');
	moves = board.getMoves();

	[
		{ from: Board.coord.a8, to: Board.coord.b6 },
		{ from: Board.coord.a8, to: Board.coord.c7 },
	].forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});
});

test('Kight #2 [capture]', () => {
	const board = new Board();
	board.load('N7/8/1p6/8/8/8/8/8 w - - 0 1');
	const moves = board.getMoves();

	[
		{ from: Board.coord.a8, to: Board.coord.b6 },
		{ from: Board.coord.a8, to: Board.coord.c7 },
	].forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});
});

test('Kight #3 [blocked]', () => {
	const board = new Board();
	board.load('N7/1p6/1P6/8/8/8/8/8 w - - 0 1');
	const moves = board.getMoves();

	[
		{ from: Board.coord.a8, to: Board.coord.c7 },
	].forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});
});
