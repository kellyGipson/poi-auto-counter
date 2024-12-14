import { LogType } from "./log-types";

export class Log {
	constructor(
		public id: string,
		public title: string,
		public message: string,
		public details: string,
		public type: LogType,
	) {}
}
