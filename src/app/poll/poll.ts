import { Hunt } from "../hunts/hunt";
import { Log } from "../logging/log";

export class Poll {
	constructor(
		public logs: Log[],
		public hunts: Hunt[],
	) {}
}
