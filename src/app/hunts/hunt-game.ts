import { Version } from "./game-version";

export class HuntGame {
	constructor(
		public version: Version | string,
		public caught: boolean,
		public found: boolean,
	) {}
}
