import { expect, test } from '@jest/globals';
import Board from '../src/Board';

test('Bishop #1 [move]', () => {
	const board = new Board();

	board.load('8/8/8/8/8/8/6B1/8 w - - 0 1');
	let moves = board.getMoves();
	let expectedMoves = [
		{ from: Board.coord.g2, to: Board.coord.h1 },
		{ from: Board.coord.g2, to: Board.coord.h3 },
		{ from: Board.coord.g2, to: Board.coord.f3 },
		{ from: Board.coord.g2, to: Board.coord.e4 },
		{ from: Board.coord.g2, to: Board.coord.d5 },
		{ from: Board.coord.g2, to: Board.coord.c6 },
		{ from: Board.coord.g2, to: Board.coord.b7 },
		{ from: Board.coord.g2, to: Board.coord.a8 },
		{ from: Board.coord.g2, to: Board.coord.f1 },
	];

	expect(moves.length).toEqual(expectedMoves.length);
	expectedMoves.forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});

	board.load('8/8/8/3B4/8/8/8/8 w - - 0 1');
	moves = board.getMoves();
	expectedMoves = [
		{ from: Board.coord.d5, to: Board.coord.a8 },
		{ from: Board.coord.d5, to: Board.coord.b7 },
		{ from: Board.coord.d5, to: Board.coord.c6 },
		{ from: Board.coord.d5, to: Board.coord.e6 },
		{ from: Board.coord.d5, to: Board.coord.f7 },
		{ from: Board.coord.d5, to: Board.coord.g8 },
		{ from: Board.coord.d5, to: Board.coord.c4 },
		{ from: Board.coord.d5, to: Board.coord.b3 },
		{ from: Board.coord.d5, to: Board.coord.a2 },
		{ from: Board.coord.d5, to: Board.coord.e4 },
		{ from: Board.coord.d5, to: Board.coord.f3 },
		{ from: Board.coord.d5, to: Board.coord.g2 },
		{ from: Board.coord.d5, to: Board.coord.h1 },
	];

	expect(moves.length).toEqual(expectedMoves.length);
	expectedMoves.forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});
});

test('Bishop #2 [capture]', () => {
	const board = new Board();

	board.load('8/8/8/8/4b3/8/6B1/8 w - - 0 1');
	const moves = board.getMoves();
	const expectedMoves = [
		{ from: Board.coord.g2, to: Board.coord.h1 },
		{ from: Board.coord.g2, to: Board.coord.h3 },
		{ from: Board.coord.g2, to: Board.coord.f1 },
		{ from: Board.coord.g2, to: Board.coord.f3 },
		{ from: Board.coord.g2, to: Board.coord.e4 },
	];

	expect(moves.length).toEqual(expectedMoves.length);
	expectedMoves.forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});
});

test('Bishop #3 [blocked]', () => {
	const board = new Board();

	board.load('8/8/8/7B/8/4p3/4P3/8 w - - 0 1');
	const moves = board.getMoves();
	const expectedMoves = [
		{ from: Board.coord.h5, to: Board.coord.g4 },
		{ from: Board.coord.h5, to: Board.coord.f3 },
		{ from: Board.coord.h5, to: Board.coord.g6 },
		{ from: Board.coord.h5, to: Board.coord.f7 },
		{ from: Board.coord.h5, to: Board.coord.e8 },
	];

	expect(moves.length).toEqual(expectedMoves.length);
	expectedMoves.forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});
});
