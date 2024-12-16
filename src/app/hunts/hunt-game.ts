import { Version } from "./game-version";

export class Game {
	constructor(
		public version: Version | string,
		public location: string,
		public caught: boolean,
		public found: boolean,
	) {}
}
