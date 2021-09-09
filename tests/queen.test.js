import { expect, test } from '@jest/globals';
import Board from '../src/Board';

test('Queen #1 [simple - move]', () => {
	const board = new Board();

	board.load('8/8/8/8/8/8/8/Q7 w - - 0 1');
	let moves = board.moveGen.getSimpleMoves();
	let expectedMoves = [
		{ from: Board.coord.a1, to: Board.coord.h8 },
		{ from: Board.coord.a1, to: Board.coord.g7 },
		{ from: Board.coord.a1, to: Board.coord.f6 },
		{ from: Board.coord.a1, to: Board.coord.e5 },
		{ from: Board.coord.a1, to: Board.coord.d4 },
		{ from: Board.coord.a1, to: Board.coord.c3 },
		{ from: Board.coord.a1, to: Board.coord.b2 },
		{ from: Board.coord.a1, to: Board.coord.b1 },
		{ from: Board.coord.a1, to: Board.coord.c1 },
		{ from: Board.coord.a1, to: Board.coord.d1 },
		{ from: Board.coord.a1, to: Board.coord.e1 },
		{ from: Board.coord.a1, to: Board.coord.f1 },
		{ from: Board.coord.a1, to: Board.coord.g1 },
		{ from: Board.coord.a1, to: Board.coord.h1 },
		{ from: Board.coord.a1, to: Board.coord.a2 },
		{ from: Board.coord.a1, to: Board.coord.a3 },
		{ from: Board.coord.a1, to: Board.coord.a4 },
		{ from: Board.coord.a1, to: Board.coord.a5 },
		{ from: Board.coord.a1, to: Board.coord.a6 },
		{ from: Board.coord.a1, to: Board.coord.a7 },
		{ from: Board.coord.a1, to: Board.coord.a8 },
	];

	expect(moves.length).toEqual(expectedMoves.length);
	expectedMoves.forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});

	board.load('7Q/8/8/8/8/8/8/8 w - - 0 1');
	moves = board.moveGen.getSimpleMoves();
	expectedMoves = [
		{ from: Board.coord.h8, to: Board.coord.a8 },
		{ from: Board.coord.h8, to: Board.coord.b8 },
		{ from: Board.coord.h8, to: Board.coord.c8 },
		{ from: Board.coord.h8, to: Board.coord.d8 },
		{ from: Board.coord.h8, to: Board.coord.e8 },
		{ from: Board.coord.h8, to: Board.coord.f8 },
		{ from: Board.coord.h8, to: Board.coord.g8 },
		{ from: Board.coord.h8, to: Board.coord.g7 },
		{ from: Board.coord.h8, to: Board.coord.f6 },
		{ from: Board.coord.h8, to: Board.coord.e5 },
		{ from: Board.coord.h8, to: Board.coord.d4 },
		{ from: Board.coord.h8, to: Board.coord.c3 },
		{ from: Board.coord.h8, to: Board.coord.b2 },
		{ from: Board.coord.h8, to: Board.coord.a1 },
		{ from: Board.coord.h8, to: Board.coord.h7 },
		{ from: Board.coord.h8, to: Board.coord.h6 },
		{ from: Board.coord.h8, to: Board.coord.h5 },
		{ from: Board.coord.h8, to: Board.coord.h4 },
		{ from: Board.coord.h8, to: Board.coord.h3 },
		{ from: Board.coord.h8, to: Board.coord.h2 },
		{ from: Board.coord.h8, to: Board.coord.h1 },
	];

	expect(moves.length).toEqual(expectedMoves.length);
	expectedMoves.forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});

	board.load('8/8/8/3Q4/8/8/8/8 w - - 0 1');
	moves = board.moveGen.getSimpleMoves();
	expectedMoves = [
		{ from: Board.coord.d5, to: Board.coord.a8 },
		{ from: Board.coord.d5, to: Board.coord.b7 },
		{ from: Board.coord.d5, to: Board.coord.c6 },
		{ from: Board.coord.d5, to: Board.coord.a5 },
		{ from: Board.coord.d5, to: Board.coord.b5 },
		{ from: Board.coord.d5, to: Board.coord.c5 },
		{ from: Board.coord.d5, to: Board.coord.a2 },
		{ from: Board.coord.d5, to: Board.coord.b3 },
		{ from: Board.coord.d5, to: Board.coord.c4 },
		{ from: Board.coord.d5, to: Board.coord.d4 },
		{ from: Board.coord.d5, to: Board.coord.d3 },
		{ from: Board.coord.d5, to: Board.coord.d2 },
		{ from: Board.coord.d5, to: Board.coord.d1 },
		{ from: Board.coord.d5, to: Board.coord.e4 },
		{ from: Board.coord.d5, to: Board.coord.f3 },
		{ from: Board.coord.d5, to: Board.coord.g2 },
		{ from: Board.coord.d5, to: Board.coord.h1 },
		{ from: Board.coord.d5, to: Board.coord.e5 },
		{ from: Board.coord.d5, to: Board.coord.f5 },
		{ from: Board.coord.d5, to: Board.coord.g5 },
		{ from: Board.coord.d5, to: Board.coord.h5 },
		{ from: Board.coord.d5, to: Board.coord.e6 },
		{ from: Board.coord.d5, to: Board.coord.f7 },
		{ from: Board.coord.d5, to: Board.coord.g8 },
		{ from: Board.coord.d5, to: Board.coord.d6 },
		{ from: Board.coord.d5, to: Board.coord.d7 },
		{ from: Board.coord.d5, to: Board.coord.d8 },
	];

	expect(moves.length).toEqual(expectedMoves.length);
	expectedMoves.forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});
});

test('Queen #2 [simple - capture]', () => {
	const board = new Board();

	board.load('8/3p1p2/8/3Q4/8/8/8/8 w - - 0 1');
	const moves = board.moveGen.getSimpleMoves();
	const expectedMoves = [
		{ from: Board.coord.d5, to: Board.coord.a8 },
		{ from: Board.coord.d5, to: Board.coord.b7 },
		{ from: Board.coord.d5, to: Board.coord.c6 },
		{ from: Board.coord.d5, to: Board.coord.a5 },
		{ from: Board.coord.d5, to: Board.coord.b5 },
		{ from: Board.coord.d5, to: Board.coord.c5 },
		{ from: Board.coord.d5, to: Board.coord.a2 },
		{ from: Board.coord.d5, to: Board.coord.d4 },
		{ from: Board.coord.d5, to: Board.coord.d3 },
		{ from: Board.coord.d5, to: Board.coord.d2 },
		{ from: Board.coord.d5, to: Board.coord.d1 },
		{ from: Board.coord.d5, to: Board.coord.b3 },
		{ from: Board.coord.d5, to: Board.coord.c4 },
		{ from: Board.coord.d5, to: Board.coord.e4 },
		{ from: Board.coord.d5, to: Board.coord.f3 },
		{ from: Board.coord.d5, to: Board.coord.g2 },
		{ from: Board.coord.d5, to: Board.coord.h1 },
		{ from: Board.coord.d5, to: Board.coord.e5 },
		{ from: Board.coord.d5, to: Board.coord.f5 },
		{ from: Board.coord.d5, to: Board.coord.g5 },
		{ from: Board.coord.d5, to: Board.coord.h5 },
		{ from: Board.coord.d5, to: Board.coord.e6 },
		{ from: Board.coord.d5, to: Board.coord.f7 },
		{ from: Board.coord.d5, to: Board.coord.d6 },
		{ from: Board.coord.d5, to: Board.coord.d7 },
	];

	expect(moves.length).toEqual(expectedMoves.length);
	expectedMoves.forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});
});

test('Queen #3 [simple - blocked]', () => {
	const board = new Board();

	board.load('8/3p1p2/3P4/3Q4/3P4/8/8/8 w - - 0 1');
	const moves = board.moveGen.getSimpleMoves();
	const expectedMoves = [
		{ from: Board.coord.d5, to: Board.coord.a8 },
		{ from: Board.coord.d5, to: Board.coord.b7 },
		{ from: Board.coord.d5, to: Board.coord.c6 },
		{ from: Board.coord.d5, to: Board.coord.a5 },
		{ from: Board.coord.d5, to: Board.coord.b5 },
		{ from: Board.coord.d5, to: Board.coord.c5 },
		{ from: Board.coord.d5, to: Board.coord.a2 },
		{ from: Board.coord.d5, to: Board.coord.b3 },
		{ from: Board.coord.d5, to: Board.coord.c4 },
		{ from: Board.coord.d5, to: Board.coord.e4 },
		{ from: Board.coord.d5, to: Board.coord.f3 },
		{ from: Board.coord.d5, to: Board.coord.g2 },
		{ from: Board.coord.d5, to: Board.coord.h1 },
		{ from: Board.coord.d5, to: Board.coord.e5 },
		{ from: Board.coord.d5, to: Board.coord.f5 },
		{ from: Board.coord.d5, to: Board.coord.g5 },
		{ from: Board.coord.d5, to: Board.coord.h5 },
		{ from: Board.coord.d5, to: Board.coord.e6 },
		{ from: Board.coord.d5, to: Board.coord.f7 },
	];

	expect(moves.length).toEqual(expectedMoves.length);
	expectedMoves.forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});
});
