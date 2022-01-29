export default class UCIUtility {
	static moveTo(move: string) :string {
		return move.slice(2, 2);
	}

	static moveFrom(move: string) :string {
		return move.slice(0, 2);
	}

	static moveGetPromotion(move: string) :string {
		return move.slice(4, 1);
	}

	static moveIsPromotion(move: string) :boolean {
		return move.length === 5;
	}
}
