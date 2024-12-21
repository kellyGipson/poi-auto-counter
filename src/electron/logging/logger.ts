import { LogTypes } from '../../app/infrastructure/logging/log-types';
import { Log } from '../../app/infrastructure/logging/log';
import { randomUUID } from 'crypto';

export class Logger {
	static logs: Log[] = [];

	static buildLog(message: string, logType: LogTypes, details: string, title = 'Main Process') {
		return { id: randomUUID(), message: message, type: logType, title, details };
	}

	static info(message: string, details: string) {
		Logger.addLog(Logger.buildLog(message, LogTypes.info, details));
	}

	static warn(message: string, details: string) {
		Logger.addLog(Logger.buildLog(message, LogTypes.warn, details));
	}

	static error(message: string, details: string) {
		Logger.addLog(Logger.buildLog(message, LogTypes.error, details));
	}

	static debug(message: string, details: string) {
		Logger.addLog(Logger.buildLog(message, LogTypes.debug, details));
	}

	static addLog(log: Log) {
		Logger.logs.push(log);
	}

	static removeLog(logId: string) {
		const logIndex = Logger.logs.findIndex((log) => log.id === logId);

		if (logIndex !== -1) {
			Logger.logs.splice(logIndex, 1);
		}

		return logIndex;
	}

	static removeAllLogs() {
		Logger.logs = [];
	}
}
