import { PageConfig } from "../../../../infrastructure/page/page-config";
import { AddTriggerComponent } from "./add-trigger.component";

export const addTriggerConfig: () => PageConfig = () => ({
	route: {
		path: 'hunts/:huntId/counters/:counterId/add-trigger',
		component: AddTriggerComponent,
		data: {
			title: 'Add Trigger'
		}
	},
});
