export abstract class File<Data> {
	constructor(
		public path: string,
		public filename: string,
	) {}

	abstract read(): File<Data>;
	abstract write(data: Data): void;
}
