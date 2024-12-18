const fs = require('fs');
const getAppDataPath = require('appdata-path').getAppDataPath;
const packageJson = require('../../../package.json');
const { Logger } = require('../logging/logger');
const { HuntsFolder } = require('../hunt/hunts-folder');

class AppData {
	PAC_PATH = `${getAppDataPath()}\\${packageJson.name}`;
	huntsFolder;

	constructor() {
		this.checkFolders();
	}

	checkFolders() {
		this.checkForAppDataFolder();
		this.checkForApplicationFolder();
		this.huntsFolder = new HuntsFolder(this.PAC_PATH);
	}

	checkForApplicationFolder() {
		try {
			fs.readdirSync(this.PAC_PATH);
		} catch (e) {
			fs.mkdirSync(this.PAC_PATH);
		}
	}

	checkForAppDataFolder() {
		try {
			fs.readdirSync(getAppDataPath());
		} catch (e) {
			Logger.error('AppData folder is missing. Hunts stored locally will not be accessible.', e.stack);
		}
	}
}
module.exports = { AppData };
