class Log {
	id;
	message;
	type;
	title;
	details;

	/**
	 * @param {*} log type: { id: string, message: string, type: string, title: string, details: string }
	 */
	constructor(log) {
		this.id = log?.id;
		this.message = log?.message;
		this.type = log?.type;
		this.title = log?.title;
		this.details = log?.details;
	}
}
module.exports = { Log };
