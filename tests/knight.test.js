import { expect, test } from '@jest/globals';
import Board from '../src/Board';

test('Kight #1 [simple - move]', () => {
	const board = new Board();

	board.load('8/8/8/8/8/4N3/8/8 w - - 0 1');
	let moves = board.getSimpleMoves();
	let expectedMoves = [
		{ from: Board.coord.e3, to: Board.coord.d5 },
		{ from: Board.coord.e3, to: Board.coord.f5 },
		{ from: Board.coord.e3, to: Board.coord.c4 },
		{ from: Board.coord.e3, to: Board.coord.g4 },
		{ from: Board.coord.e3, to: Board.coord.c2 },
		{ from: Board.coord.e3, to: Board.coord.g2 },
		{ from: Board.coord.e3, to: Board.coord.d1 },
		{ from: Board.coord.e3, to: Board.coord.f1 },
	];

	expect(moves.length).toEqual(expectedMoves.length);
	expectedMoves.forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});

	board.load('8/8/8/8/8/8/6N1/8 w - - 0 1');
	moves = board.getSimpleMoves();
	expectedMoves = [
		{ from: Board.coord.g2, to: Board.coord.e3 },
		{ from: Board.coord.g2, to: Board.coord.f4 },
		{ from: Board.coord.g2, to: Board.coord.h4 },
		{ from: Board.coord.g2, to: Board.coord.e1 },
	];

	expect(moves.length).toEqual(expectedMoves.length);
	expectedMoves.forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});

	board.load('N7/8/8/8/8/8/8/8 w - - 0 1');
	moves = board.getSimpleMoves();
	expectedMoves = [
		{ from: Board.coord.a8, to: Board.coord.b6 },
		{ from: Board.coord.a8, to: Board.coord.c7 },
	];

	expect(moves.length).toEqual(expectedMoves.length);
	expectedMoves.forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});
});

test('Kight #2 [simple - capture]', () => {
	const board = new Board();

	board.load('N7/8/1p6/8/8/8/8/8 w - - 0 1');
	const moves = board.getSimpleMoves();
	const expectedMoves = [
		{ from: Board.coord.a8, to: Board.coord.b6 },
		{ from: Board.coord.a8, to: Board.coord.c7 },
	];

	expect(moves.length).toEqual(expectedMoves.length);
	expectedMoves.forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});
});

test('Kight #3 [simple - blocked]', () => {
	const board = new Board();

	board.load('N7/1p6/1P6/8/8/8/8/8 w - - 0 1');
	const moves = board.getSimpleMoves();
	const expectedMoves = [
		{ from: Board.coord.a8, to: Board.coord.c7 },
	];

	expect(moves.length).toEqual(expectedMoves.length);
	expectedMoves.forEach(move => {
		expect(moves.some(m => {
			return JSON.stringify(m) === JSON.stringify(move);
		})).toBe(true);
	});
});
