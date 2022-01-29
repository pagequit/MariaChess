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

test('Pieces #1', () => {
	const board = new Board();
	board.reset();

	expect(board.pieces.white.size).toEqual(16);
	expect(board.pieces.black.size).toEqual(16);

	board.load('4k3/8/8/8/8/4p3/4P3/4K3 w - - 0 1');

	expect(board.pieces.white.size).toEqual(2);
	expect(board.pieces.black.size).toEqual(2);
});

test('Offsets #1', () => {
	const targetPiece = Board.coord.a1;

	expect(Board.getOffsetLeft(targetPiece)).toEqual(-0);
	expect(Board.getOffsetTop(targetPiece)).toEqual(-7);
	expect(Board.getOffsetRight(targetPiece)).toEqual(7);
	expect(Board.getOffsetBottom(targetPiece)).toEqual(0);
});

test('Offsets #2', () => {
	const targetPiece = Board.coord.h8;

	expect(Board.getOffsetLeft(targetPiece)).toEqual(-7);
	expect(Board.getOffsetTop(targetPiece)).toEqual(0);
	expect(Board.getOffsetRight(targetPiece)).toEqual(0);
	expect(Board.getOffsetBottom(targetPiece)).toEqual(7);
});

test('Offsets #3', () => {
	const targetPiece = Board.coord.d5;

	expect(Board.getOffsetLeft(targetPiece)).toEqual(-3);
	expect(Board.getOffsetTop(targetPiece)).toEqual(-3);
	expect(Board.getOffsetRight(targetPiece)).toEqual(4);
	expect(Board.getOffsetBottom(targetPiece)).toEqual(4);
});
