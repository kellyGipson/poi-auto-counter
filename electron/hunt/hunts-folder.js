const fs = require('fs');
const { AppDataFile } = require('../app-data/app-data-file');
const { randomUUID } = require('crypto');
const { Logger } = require('../logging/logger');
const { spawn } = require('child_process');
const { LogTypes } = require('../logging/log-types');
const { isFolderOpen } = require('./is-folder-open');

class HuntsFolder {
	/* String 		   */ FOLDER_NAME = 'Hunts';
	/* String 		   */ BASE_URL;
	/* AppDataFile[] */ hunts = [];

	constructor(PARENT_PATH) {
		this.BASE_URL = PARENT_PATH + '\\' + this.FOLDER_NAME;

		this.checkForHuntsFolder();
	}

	isOpen() {
		return isFolderOpen(this.BASE_URL);
	}

	open() {
		try {
			const isHuntsFolderOpen = this.isOpen();
			if (!isHuntsFolderOpen) {
				spawn(`explorer "${this.BASE_URL}"`, { shell: true });
			}
		} catch (err) {
			Logger.addLog(Logger.buildLog(err.message, LogTypes.error, err.stack, 'Windows Explorer Error'));
		}
	}

	addHunt(hunt) {
		hunt.id = randomUUID();

		if (hunt?.counters?.length > 0) {
			hunt.counters.forEach((counter) => {
				counter.id = randomUUID();
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
