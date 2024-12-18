const fs = require('fs');
const { File } = require('../infrustructure/file');

/**
 * Serialized, the AppDataFile UUID is the file name and
 * its contents are a javascript object which is serialized to JSON
 * then encoded to base64 and saved to a path defined by the consumer.
 * When Hydrated, the AppDataFile is converted back into a javascript object for consumption
 */
class AppDataFile extends File {
	path;
	filename;
	contents;
	backupContents;

	get url() {
		return this.path + '\\' + this.filename;
	}

	constructor(path, filename) {
		super();
		this.path = path;
		this.filename = filename;
	}

	read() {
		this.backupContents = this.rawToObject(this.readFileSync(this.url + '.bak'));
		this.contents = this.rawToObject(this.readFileSync(this.url));

		return this; // returns the class instance instead of the contents themselves because the contents are both stored here anyways...
	}

	write(dataToWrite/* js object */) {
		const rawData = this.objectToRaw(dataToWrite);
		this.writeFileSync(`${this.url}.bak`, rawData);
		this.writeFileSync(this.url, rawData);
		this.backupContents = dataToWrite;
		this.contents = dataToWrite;
	}

	readFileSync(path) {
		return fs.readFileSync(path);
	}

	writeFileSync(path, contents) {
		fs.writeFileSync(path, contents);
	}

	objectToRaw(jsObj) {
		return JSON.stringify(jsObj);
	}

	rawToObject(raw) {
		return JSON.parse(raw);
	}
}
module.exports = { AppDataFile: AppDataFile };
