import fs from 'fs';
import { File } from '../infrastructure/file';

/**
 * Serialized, the AppDataFile UUID is the file name and
 * its contents are a javascript object which is serialized to JSON
 * then encoded to base64 and saved to a path defined by the consumer.
 * When Hydrated, the AppDataFile is converted back into a javascript object for consumption
 */
export class AppDataFile<Data> extends File<Data> {
	contents?: Data;
	backupContents?: Data;

	get url() {
		return this.path + '\\' + this.filename;
	}

	constructor(public path: string, public filename: string) {
		super(path, filename);
	}

	read(): AppDataFile<Data> {
		this.backupContents = this.rawToObject(this.readFileSync(this.url + '.bak'));
		this.contents = this.rawToObject(this.readFileSync(this.url));

		return this; // returns the class instance instead of the contents themselves because the contents are both stored here anyways...
	}

	write(data: Data) {
		const rawData = this.objectToRaw(data);
		this.writeFileSync(`${this.url}.bak`, rawData);
		this.writeFileSync(this.url, rawData);
		this.backupContents = data;
		this.contents = data;
	}

	readFileSync(path: string): string {
		return fs.readFileSync(path) as any as string;
	}

	writeFileSync(path: string, contents: string) {
		fs.writeFileSync(path, contents);
	}

	objectToRaw(jsObj: Data) {
		return JSON.stringify(jsObj);
	}

	rawToObject(raw: string) {
		return JSON.parse(raw);
	}
}
