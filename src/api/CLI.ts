import API from './API';
import MariaChess from '../MariaChess';

export default class CLI extends API {
	constructor(maria: MariaChess) {
		super(maria);
	}
}
