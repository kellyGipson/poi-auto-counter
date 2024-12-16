class Hunt {
	id;
	createdDate;
	lastModifiedDate;
	species;

	/**
	 * @type
		{
			id: string;
			count: number;
			interval: number;
			method: (Method | string)
			games: {
				version: (Version | string);
				caught: boolean;
				found: boolean;
			}[];
		}[]
	*/
	counters = [];
}
module.exports = { Hunt };
