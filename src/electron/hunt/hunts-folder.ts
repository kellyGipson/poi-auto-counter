import fs from 'fs';
import { AppDataFile } from '../app-data/app-data-file';
import { randomUUID } from 'crypto';
import { Logger } from '../logging/logger';
import { spawn } from 'child_process';
import { isFolderOpen } from './is-folder-open';
import { LogTypes } from '../../app/infrastructure/logging/log-types';
import { Hunt } from '../../app/infrastructure/auto-counter/hunt';

export class HuntsFolder {
	FOLDER_NAME = 'Hunts';
	BASE_URL: string;
	DELETE_URL: string;
	hunts: AppDataFile<Hunt>[] = [];

	constructor(PARENT_PATH: string) {
		this.BASE_URL = PARENT_PATH + '\\' + this.FOLDER_NAME;
		this.DELETE_URL = this.BASE_URL + '\\deleted';

		this.checkForHuntsFolder();
		this.checkForDeletedFolder();
	}

	isOpen() {
		return isFolderOpen(this.BASE_URL);
	}

	open() {
		try {
			if (!this.isOpen()) {
				spawn(`explorer "${this.BASE_URL}"`, { shell: true });
			}
		} catch (error: any) {
			Logger.addLog(Logger.buildLog(error.message, LogTypes.error, error.stack, 'Windows Explorer Error'));
		}
	}

	addHunt(hunt: Hunt) {
		hunt.id = randomUUID() as string;
		const utcDate = new Date().toISOString();
		hunt.createdDate = utcDate;
		hunt.lastModifiedDate = utcDate;

		if (hunt?.counters?.length > 0) {
			hunt.counters.forEach((counter) => {
				counter.id = randomUUID() as string;
			});
		}

		const newFile = new AppDataFile<Hunt>(this.BASE_URL, `${hunt?.species}_${hunt?.id}`, this.DELETE_URL);
		newFile.write(hunt);
		this.hunts.push(newFile);
	}

	editHunt(hunt: Hunt) {
		const appDataFile = this.hunts.find(h => h?.contents?.id === hunt?.id);

		try {
			appDataFile?.write(hunt);
		} catch (e: any) {
			Logger.error(`Count not find Hunt ${hunt?.species} with ID ${hunt?.id}`, e?.stack);
		}
	}

	deleteHunt(huntId: string) {
		const appDataFile = this.hunts.find(h => h?.contents?.id === huntId);

		try {
			appDataFile?.delete();
		} catch (e: any) {
			if (appDataFile?.filename) {}
			Logger.error(e?.message, e?.stack);
		}
	}

	checkForHuntsFolder() {
		let huntFileNames: string[] = [];
		try {
			huntFileNames = fs.readdirSync(this.BASE_URL, { withFileTypes: true })
				.filter((dirEnt) => dirEnt.isFile() && !dirEnt.name.includes('.bak'))
				.map((dirEnt) => dirEnt.name);
		}
		catch (e) {
			fs.mkdirSync(this.BASE_URL);
		}
		finally {
			this.hunts = huntFileNames.map((fileName) => new AppDataFile<Hunt>(this.BASE_URL, fileName, this.DELETE_URL).read());
		}
	}

	checkForDeletedFolder() {
		try {
			fs.readdirSync(this.DELETE_URL);
		}
		catch (e) {
			fs.mkdirSync(this.DELETE_URL);
		}
	}
}
