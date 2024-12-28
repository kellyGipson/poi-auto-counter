import { Coordinate } from '../../../infrastructure/types/coordinate';

export class Trigger {
	constructor(
		public topLeft: Coordinate,
		public bottomRight: Coordinate,
		public monitorId: string,
		public id?: string,
	) {}
}
