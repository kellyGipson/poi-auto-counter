class Log {
	id;
	message;

	/**
	 * @param {*} log type: { id: string, message: string, type: string }
	 */
	constructor(log) {
		this.id = log?.id;
		this.id = log?.message;
	}
}
module.exports = { Log };
