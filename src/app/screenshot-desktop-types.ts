export interface Display {
	id: string;
	name: string;
	height: number;
	width: number;
	left: number;
	top: number;
	right: number;
	bottom: number;
	dpiScale: number;
}
export interface ScreenshotOptions {
	format?: ImageFormat;
	screen?: string;
}
export type ImageFormat =
	| "bmp"
	| "emf"
	| "exif"
	| "jpg"
	| "jpeg"
	| "gif"
	| "png"
	| "tiff"
	| "wmf";
export interface Buffer extends Uint8Array {
	slice(start?: number, end?: number): Buffer;
	subarray(start?: number, end?: number): Buffer;
}
interface Uint8Array {
	readonly BYTES_PER_ELEMENT: number;
	readonly buffer: ArrayBufferLike;
	readonly byteLength: number;
	readonly byteOffset: number;
	copyWithin(target: number, start: number, end?: number): this;
	every(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
	fill(value: number, start?: number, end?: number): this;
	filter(predicate: (value: number, index: number, array: Uint8Array) => any, thisArg?: any): Uint8Array;
	find(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number | undefined;
	findIndex(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number;
	forEach(callbackfn: (value: number, index: number, array: Uint8Array) => void, thisArg?: any): void;
	indexOf(searchElement: number, fromIndex?: number): number;
	join(separator?: string): string;
	lastIndexOf(searchElement: number, fromIndex?: number): number;
	readonly length: number;
	map(callbackfn: (value: number, index: number, array: Uint8Array) => number, thisArg?: any): Uint8Array;
	reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
	reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
	reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
	reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
	reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
	reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
	reverse(): Uint8Array;
	set(array: ArrayLike<number>, offset?: number): void;
	slice(start?: number, end?: number): Uint8Array;
	some(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
	sort(compareFn?: (a: number, b: number) => number): this;
	subarray(begin?: number, end?: number): Uint8Array;
	toLocaleString(): string;
	toString(): string;
	valueOf(): Uint8Array;
	[index: number]: number;
}
