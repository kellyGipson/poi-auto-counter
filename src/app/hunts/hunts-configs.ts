import { PageConfig } from "../infrastructure/page/page-config";
import { AddHuntComponent } from "./add/add.component";
import { EditHuntComponent } from "./edit/edit.component";
import { HuntsComponent } from "./hunts.component";

export const huntsConfig: () => PageConfig = () => ({
	route: {
		path: 'hunts',
		component: HuntsComponent,
		data: {
			title: 'Hunts'
		}
	},
});
export const addHuntConfig: () => PageConfig = () => ({
	route: {
		path: 'hunts/add',
		component: AddHuntComponent,
		data: {
			title: 'Add Hunt',
		},
		pathMatch: 'full',
	},
});
export const editHuntConfig: () => PageConfig = () => ({
	route: {
		path: 'hunts/:id/edit',
		component: EditHuntComponent,
		data: { title: 'Edit Hunt' },
		pathMatch: 'full',
	},
});
