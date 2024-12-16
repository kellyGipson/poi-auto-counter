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
		this.backupContents = this.b64ToJsObj(this.readFileSync(this.url + '.bak'));
		this.contents = this.b64ToJsObj(this.readFileSync(this.url));

		return this; // returns the class instance instead of the contents themselves because the contents are both stored here anyways...
	}

	write(dataToWrite/* js object */) {
		const b64 = this.jsObjToB64(dataToWrite);
		this.writeFileSync(`${this.url}.bak`, b64);
		this.writeFileSync(this.url, b64);
		this.backupContents = dataToWrite;
		this.contents = dataToWrite;
	}

	readFileSync(path) {
		return fs.readFileSync(path, { encoding: 'base64' });
	}

	writeFileSync(path, contents) {
		fs.writeFileSync(path, contents);
	}

	jsObjToB64(jsObj) {
		const json = JSON.stringify(jsObj);
		return atob(json);
	}

	b64ToJsObj(b64) {
		const json = btoa(b64);
		return JSON.parse(json);
	}
}
module.exports = { AppDataFile: AppDataFile };
