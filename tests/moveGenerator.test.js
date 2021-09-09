import { expect, test } from '@jest/globals';
import Board from '../src/Board';

test('getAttackedSquaresByPiece #1', () => {
	const board = new Board();
	board.load('8/8/8/8/8/4k3/4P3/3B2K1 w - - 0 1');

	let targets = board.moveGen.getCoveredSquaresFrom(Board.coord.e2);
	let expectedTargets = [
		Board.coord.d3,
		Board.coord.f3,
	];

	targets = board.moveGen.getCoveredSquaresFrom(Board.coord.d1);
	expectedTargets = [
		Board.coord.c2,
		Board.coord.b3,
		Board.coord.a4,
		Board.coord.e2,
	];

	expect(targets).toEqual(expectedTargets);
});
