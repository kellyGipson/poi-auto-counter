export const processArgv = (argv: string[]): Record<PoiAutoCounterArg, string> =>
	argv
		.map((arg) => arg.split('='))
		.reduce((result, item) => {
			const [ key, value ] = item;
			result[key as any] = value;
			return result;
		}) as any as Record<PoiAutoCounterArg, string>;

export type PoiAutoCounterArg = 'APP_DEV';
