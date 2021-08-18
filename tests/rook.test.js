import { expect, test } from '@jest/globals';
import Board from '../src/Board';

test('Rook #1 [move]', () => {
	const board = new Board();
	board.load('8/8/8/8/8/8/8/R7 w - - 0 1');
	const moves = board.getMoves();

	[
		{ from: Board.coord.a1, to: Board.coord.a2 },
		{ from: Board.coord.a1, to: Board.coord.a3 },
		{ from: Board.coord.a1, to: Board.coord.a4 },
		{ from: Board.coord.a1, to: Board.coord.a5 },
		{ from: Board.coord.a1, to: Board.coord.a6 },
		{ from: Board.coord.a1, to: Board.coord.a7 },
		{ from: Board.coord.a1, to: Board.coord.a8 },
		{ from: Board.coord.a1, to: Board.coord.b1 },
		{ from: Board.coord.a1, to: Board.coord.c1 },
		{ from: Board.coord.a1, to: Board.coord.d1 },
		{ from: Board.coord.a1, to: Board.coord.e1 },
		{ from: Board.coord.a1, to: Board.coord.f1 },
		{ from: Board.coord.a1, to: Board.coord.g1 },
		{ from: Board.coord.a1, to: Board.coord.h1 },
	].forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});
});

test('Rook #2 [capture]', () => {
	const board = new Board();
	board.load('8/p7/8/8/8/8/8/R7 w - - 0 1');
	const moves = board.getMoves();

	[
		{ from: Board.coord.a1, to: Board.coord.a2 },
		{ from: Board.coord.a1, to: Board.coord.a3 },
		{ from: Board.coord.a1, to: Board.coord.a4 },
		{ from: Board.coord.a1, to: Board.coord.a5 },
		{ from: Board.coord.a1, to: Board.coord.a6 },
		{ from: Board.coord.a1, to: Board.coord.a7 },
		{ from: Board.coord.a1, to: Board.coord.b1 },
		{ from: Board.coord.a1, to: Board.coord.c1 },
		{ from: Board.coord.a1, to: Board.coord.d1 },
		{ from: Board.coord.a1, to: Board.coord.e1 },
		{ from: Board.coord.a1, to: Board.coord.f1 },
		{ from: Board.coord.a1, to: Board.coord.g1 },
		{ from: Board.coord.a1, to: Board.coord.h1 },
	].forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});
});

test('Rook #3 [blocked]', () => {
	const board = new Board();
	board.load('8/8/8/8/8/p7/P7/R7 w - - 0 1');
	const moves = board.getMoves();

	[
		{ from: Board.coord.a1, to: Board.coord.b1 },
		{ from: Board.coord.a1, to: Board.coord.c1 },
		{ from: Board.coord.a1, to: Board.coord.d1 },
		{ from: Board.coord.a1, to: Board.coord.e1 },
		{ from: Board.coord.a1, to: Board.coord.f1 },
		{ from: Board.coord.a1, to: Board.coord.g1 },
		{ from: Board.coord.a1, to: Board.coord.h1 },
	].forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});
});
