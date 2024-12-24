import { Routes } from '@angular/router';
import { HuntComponent } from './hunts/hunt/hunt.component';
import { addHuntConfig, editHuntConfig, huntsConfig } from './hunts/hunts-configs';

export const routes: Routes = [
	huntsConfig().route,
	addHuntConfig().route,
	{ path: 'hunts/:id', component: HuntComponent, data: { title: huntsConfig }, pathMatch: 'full' },
	editHuntConfig().route,
	{ path: '**', redirectTo: huntsConfig().route.path },
];
