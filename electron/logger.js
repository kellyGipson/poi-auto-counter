const { v7 } = require('uuid');
const { Log } = require('./log');
const { LogTypes } = require('./log-types');

class Logger {
	static logs = [];

	/**
	 * @param {*} message type: string
	 */
	static info(message) {
		Logger.addLog({ id: v7(), message, type: LogTypes.info });
	}

	/**
	 * @param {*} message type: string
	 */
	static warn(message) {
		Logger.addLog({ id: v7(), message, type: LogTypes.warn });
	}

	/**
	 * @param {*} message type: string
	 */
	static error(message) {
		Logger.addLog({ id: v7(), message, type: LogTypes.error });
	}

	/**
	 * @param {*} message type: string
	 */
	static debug(message) {
		Logger.addLog({ id: v7(), message, type: LogTypes.debug });
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
	}
}
module.exports = { Logger };
