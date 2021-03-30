import API from './API';
import MariaChess from '../MariaChess';

export default class LichessInterface extends API {
	constructor(maria: MariaChess) {
		super(maria);
	}
}
