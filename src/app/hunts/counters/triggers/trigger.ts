import { Coordinate } from '../../../infrastructure/types/coordinate';
import { SerializableObject } from '../../../utils/printable-object';

export class Trigger extends SerializableObject {
	constructor(
		public topLeft: Coordinate,
		public bottomRight: Coordinate,
		public monitorId: string,
		public id?: string,
	) {
		super();
	}
}
