import { PageConfig } from "../infrastructure/page/page-config";
import { HuntCommandComponent } from "./hunt-command.component";

export const huntCommandConfig: () => PageConfig = () => ({
	route: {
		path: 'hunt-command',
		component: HuntCommandComponent,
		data: {
			title: 'Hunt Command'
		}
	},
});
