import { expect, test } from '@jest/globals';
import Board from '../src/Board';

test('King #1 [simple - move]', () => {
	const board = new Board();

	board.load('8/8/8/8/8/8/8/4K3 w - - 0 1');
	let moves = board.moveGen.getSimpleMoves();
	let expectedMoves = [
		{ from: Board.coord.e1, to: Board.coord.d1 },
		{ from: Board.coord.e1, to: Board.coord.f1 },
		{ from: Board.coord.e1, to: Board.coord.d2 },
		{ from: Board.coord.e1, to: Board.coord.e2 },
		{ from: Board.coord.e1, to: Board.coord.f2 },
	];

	expect(moves.length).toEqual(expectedMoves.length);
	expectedMoves.forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});

	board.load('8/8/8/8/8/8/3K4/8 w - - 0 1');
	moves = board.moveGen.getSimpleMoves();
	expectedMoves = [
		{ from: Board.coord.d2, to: Board.coord.c3 },
		{ from: Board.coord.d2, to: Board.coord.d3 },
		{ from: Board.coord.d2, to: Board.coord.e3 },
		{ from: Board.coord.d2, to: Board.coord.c2 },
		{ from: Board.coord.d2, to: Board.coord.e2 },
		{ from: Board.coord.d2, to: Board.coord.c1 },
		{ from: Board.coord.d2, to: Board.coord.d1 },
		{ from: Board.coord.d2, to: Board.coord.e1 },
	];

	expect(moves.length).toEqual(expectedMoves.length);
	expectedMoves.forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});

	board.load('8/8/8/8/8/8/8/7K w - - 0 1');
	moves = board.moveGen.getSimpleMoves();
	expectedMoves = [
		{ from: Board.coord.h1, to: Board.coord.h2 },
		{ from: Board.coord.h1, to: Board.coord.g1 },
		{ from: Board.coord.h1, to: Board.coord.g2 },
	];

	expect(moves.length).toEqual(expectedMoves.length);
	expectedMoves.forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});

	board.load('K7/8/8/8/8/8/8/8 w - - 0 1');
	moves = board.moveGen.getSimpleMoves();
	expectedMoves = [
		{ from: Board.coord.a8, to: Board.coord.b8 },
		{ from: Board.coord.a8, to: Board.coord.a7 },
		{ from: Board.coord.a8, to: Board.coord.b7 },
	];

	expect(moves.length).toEqual(expectedMoves.length);
	expectedMoves.forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});
});

test('King #2 [simple - capture]', () => {
	const board = new Board();

	board.load('8/8/8/8/8/8/4Kp2/8 w - - 0 1');
	const moves = board.moveGen.getSimpleMoves();
	const expectedMoves = [
		{ from: Board.coord.e2, to: Board.coord.d3 },
		{ from: Board.coord.e2, to: Board.coord.e3 },
		{ from: Board.coord.e2, to: Board.coord.f3 },
		{ from: Board.coord.e2, to: Board.coord.d2 },
		{ from: Board.coord.e2, to: Board.coord.f2 },
		{ from: Board.coord.e2, to: Board.coord.d1 },
		{ from: Board.coord.e2, to: Board.coord.e1 },
		{ from: Board.coord.e2, to: Board.coord.f1 },
	];

	expect(moves.length).toEqual(expectedMoves.length);
	expectedMoves.forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});
});

test('King #3 [simple - blocked]', () => {
	const board = new Board();

	board.load('8/8/8/8/8/4r3/4P3/4K3 w - - 0 1');
	const moves = board.moveGen.getSimpleMoves();
	const expectedMoves = [
		{ from: Board.coord.e1, to: Board.coord.d1 },
		{ from: Board.coord.e1, to: Board.coord.f1 },
		{ from: Board.coord.e1, to: Board.coord.d2 },
		{ from: Board.coord.e1, to: Board.coord.f2 },
	];

	expect(moves.length).toEqual(expectedMoves.length);
	expectedMoves.forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});
});
