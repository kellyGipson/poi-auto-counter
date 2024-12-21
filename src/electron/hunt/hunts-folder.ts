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
	hunts: AppDataFile<Hunt>[] = [];

	constructor(PARENT_PATH: string) {
		this.BASE_URL = PARENT_PATH + '\\' + this.FOLDER_NAME;

		this.checkForHuntsFolder();
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

		const newFile = new AppDataFile<Hunt>(this.BASE_URL, `${hunt?.species}_${hunt?.id}`);
		newFile.write(hunt);
		this.hunts.push(newFile);
	}

	checkForHuntsFolder() {
		let huntFileNames: string[] = [];
		try {
			huntFileNames = fs.readdirSync(this.BASE_URL).filter((fileName) => !fileName.includes('.bak'));
		}
		catch (e) {
			fs.mkdirSync(this.BASE_URL);
		}
		finally {
			this.hunts = huntFileNames.map((fileName) => new AppDataFile<Hunt>(this.BASE_URL, fileName).read());
		}
	}
}
