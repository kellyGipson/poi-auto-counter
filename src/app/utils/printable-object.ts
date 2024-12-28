export class SerializableObject {
	toString(): string {
		return printCtor(this, objToString(this));
	}
}
const printCtor = (obj: object, value: any) => {
 return `${obj.constructor.name}(${value})`;
}
const objToString = (obj: object): any => {
	if (obj === undefined) {
		return undefined;
	}
	if (obj === null) {
		return null;
	}
	return Object.entries(obj).map(([k, v]) => {
		const value =
			(typeof v === 'string') ?
				strToString(v) :
			(typeof v === 'object' && !!v) ?
				printCtor(v, objToString(v))
		: v;
		return `${k}: ${value}`
	}).join(', ')
}
const strToString = (str: string) => {
	return `"${str}"`;
}
