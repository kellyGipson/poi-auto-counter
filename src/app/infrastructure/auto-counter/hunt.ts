import { Counter } from "../../hunts/counters/counter";

export class Hunt {
	constructor(
		public species: string,
		public counters: Counter[],
		public createdDate?: string,
		public lastModifiedDate?: string,
		public id?: string,
	) {}
}
