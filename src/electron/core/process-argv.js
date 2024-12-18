const processArgv = (argv) =>
	argv
		.map((arg) => arg.split('='))
		.reduce((result, item) => {
			const [ key, value ] = item;
			result[key] = value;
			return result;
		});
module.exports = { processArgv };
