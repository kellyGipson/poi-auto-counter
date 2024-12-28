import { Routes } from '@angular/router';
import { HuntComponent } from './hunts/hunt/hunt.component';
import { addHuntConfig, editHuntConfig, huntsConfig } from './hunts/hunts-configs';
import { huntCommandConfig } from './hunt-command/hunt-command-configs';
import { addTriggerConfig } from './hunts/counters/triggers/add/add-trigger-config';

export const routes: Routes = [
	huntsConfig().route,
	addHuntConfig().route,
	editHuntConfig().route,
	addTriggerConfig().route,
	huntCommandConfig().route,
	{ path: 'hunts/:id', component: HuntComponent, data: { title: huntsConfig }, pathMatch: 'full' },
	{ path: '**', redirectTo: huntsConfig().route.path },
];
