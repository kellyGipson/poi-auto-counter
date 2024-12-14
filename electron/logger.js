const { v7 } = require('uuid');
const { Log } = require('./log');
const { LogTypes } = require('./log-types');

class Logger {
	static logs = [];

	static buildLog(message, logType, details) {
		return { id: v7(), message: message, type: logType, title: 'Main Process', details: details };
	}

	/**
	 * @param {*} message type: string
	 */
	static info(message, details) {
		Logger.addLog(Logger.buildLog(message, LogTypes.info, details));
	}

	/**
	 * @param {*} message type: string
	 */
	static warn(message, details) {
		Logger.addLog(Logger.buildLog(message, LogTypes.warn, details));
	}

	/**
	 * @param {*} message type: string
	 */
	static error(message, details) {
		Logger.addLog(Logger.buildLog(message, LogTypes.error, details));
	}

	/**
	 * @param {*} message type: string
	 */
	static debug(message, details) {
		Logger.addLog(Logger.buildLog(message, LogTypes.debug, details));
	}

	/**
	 * @param {*} log type: { id: string, message: string, type: string }
	 */
	static addLog(log) {
		Logger.logs.push(new Log(log));
	}

	static removeLog(logId) {
		const logIndex = Logger.logs.findIndex((log) => log?.id === logId);

		if (logIndex !== -1) {
			Logger.logs.splice(logIndex, 1);
		}

		return logIndex;
	}

	static removeAllLogs() {
		Logger.logs = [];
	}
}
module.exports = { Logger };
