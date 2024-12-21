import fs from 'fs';
const getAppDataPath = require('appdata-path').getAppDataPath;
import packageJson from '../../../package.json';
import { Logger } from '../logging/logger';
import { HuntsFolder } from '../hunt/hunts-folder';

export class AppData {
	PAC_PATH = `${getAppDataPath()}\\${packageJson.name}`;
	huntsFolder: HuntsFolder;

	constructor() {
		this.checkFolders();
		this.huntsFolder = new HuntsFolder(this.PAC_PATH);

		const appDataCheckInterval = 30000;
		setInterval(() => {// I didn't clean up here because there will only ever be one of this interval... node.js will clean it up
			this.checkFolders();
		}, appDataCheckInterval);
	}

	checkFolders() {
		console.log('AppData::checkFolders');
		this.checkForAppDataFolder();
		this.checkForApplicationFolder();
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
		} catch (error: any) {
			Logger.error('AppData folder is missing. Hunts stored locally will not be accessible.', error.stack);
		}
	}
}
