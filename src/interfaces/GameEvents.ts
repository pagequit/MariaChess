type NewGame = (FEN?: string) => void;

export default interface GameEvents {
	newGame: NewGame;
}
