const fs = require('fs');
const { v7 } = require('uuid');
const { AppDataFile } = require('../app-data/app-data-file');

class HuntsFolder {
	/* String 		   */ FOLDER_NAME = 'Hunts';
	/* String 		   */ BASE_URL;
	/* AppDataFile[] */ hunts = [];

	constructor(PARENT_PATH) {
		this.BASE_URL = PARENT_PATH + '\\' + this.FOLDER_NAME;

		this.checkForHuntsFolder();
	}

	addHunt(hunt) {
		hunt.id = v7();

		if (hunt?.counters?.length > 0) {
			hunt.counters.forEach((counter) => {
				counter.id = v7();
			});
		}

		const newFile = new AppDataFile(this.BASE_URL, hunt.id);
		newFile.write(hunt);
		this.hunts.push(hunt);
	}

	checkForHuntsFolder() {
		let huntFileNames = [];
		try {
			huntFileNames = fs.readdirSync(this.BASE_URL).filter((fileName) => fileName.endsWith('.json'));
		}
		catch (e) {
			fs.mkdirSync(this.BASE_URL);
		}
		finally {
			this.hunts = huntFileNames.map((fileName) => new AppDataFile(this.BASE_URL, fileName).read());
			console.log('this.hunts', this.hunts);
		}
	}
}
module.exports = { HuntsFolder };
