import { Trigger } from "./triggers/trigger";
import { Game } from "../hunt-game";
import { Method } from "../hunting-method";

export class Counter {
	constructor(
		public count: number,
		public interval: number,
		public method: Method | string,
		public games: Game[],
		public triggers: Trigger[],
		public id?: string,
	) {}
}
