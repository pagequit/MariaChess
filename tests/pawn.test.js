import { expect, test } from '@jest/globals';
import Board from '../src/Board';

test('Pawn #1 [move]', () => {
	const board = new Board();

	board.load('8/8/8/8/8/8/4P3/8 w - - 0 1');
	let moves = board.getMoves();
	let expectedMoves = [
		{ from: Board.coord.e2, to: Board.coord.e3 },
		{ from: Board.coord.e2, to: Board.coord.e4 },
	];

	expect(moves.length).toEqual(expectedMoves.length);
	expectedMoves.forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});

	board.load('8/8/8/8/4p3/8/4P3/8 w - - 0 1');
	moves = board.getMoves();
	expectedMoves = [
		{ from: Board.coord.e2, to: Board.coord.e3 },
	];

	expect(moves.length).toEqual(expectedMoves.length);
	expectedMoves.forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});

	board.load('8/8/8/8/8/4P3/8/8 w - - 0 1');
	moves = board.getMoves();
	expectedMoves = [
		{ from: Board.coord.e3, to: Board.coord.e4 },
	];

	expect(moves.length).toEqual(expectedMoves.length);
	expectedMoves.forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});

	board.load('8/8/8/8/8/4p3/4P3/8 w - - 0 1');
	expect(board.getMoves().length).toEqual(0);
});

test('Pawn #2 [capture]', () => {
	const board = new Board();

	board.load('8/8/8/8/3p1p2/4P3/8/8 w - - 0 1');
	const moves = board.getMoves();
	const expectedMoves = [
		{ from: Board.coord.e3, to: Board.coord.d4 },
		{ from: Board.coord.e3, to: Board.coord.e4 },
		{ from: Board.coord.e3, to: Board.coord.f4 },
	];

	expect(moves.length).toEqual(expectedMoves.length);
	expectedMoves.forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});
});

test('Pawn #3 [en passant]', () => {
	const board = new Board();

	board.load('8/8/8/4Pp2/8/8/8/8 w - f6 0 1');
	const moves = board.getMoves();
	const expectedMoves = [
		{ from: Board.coord.e5, to: Board.coord.e6 },
		{ from: Board.coord.e5, to: Board.coord.f6 },
	];

	expect(moves.length).toEqual(expectedMoves.length);
	expectedMoves.forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});
});

test('Pawn #4 [capture border left]', () => {
	const board = new Board();

	board.load('8/8/8/8/7p/pp6/P7/8 w - - 0 1');
	const moves = board.getMoves();
	const expectedMoves = [
		{ from: Board.coord.a2, to: Board.coord.b3 },
	];

	expect(moves.length).toEqual(expectedMoves.length);
	expectedMoves.forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});
});

test('Pawn #5 (capture border right)', () => {
	const board = new Board();

	board.load('8/8/8/8/8/6pp/p6P/8 w - - 0 1');
	const moves = board.getMoves();
	const expectedMoves = [
		{ from: Board.coord.h2, to: Board.coord.g3 },
	];

	expect(moves.length).toEqual(expectedMoves.length);
	expectedMoves.forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});
});
