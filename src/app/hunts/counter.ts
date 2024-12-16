import { HuntGame } from "./hunt-game";
import { Method } from "./hunting-method";

export class Counter {
	constructor(
		public count: number,
		public interval: number,
		public method: Method | string,
		public games: HuntGame[],
		public id?: string,
	) {}
}
