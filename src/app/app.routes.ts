import { Routes } from '@angular/router';
import { HuntComponent } from './hunts/hunt/hunt.component';
import { addHuntConfig, huntsConfig } from './hunts/hunts-configs';

export const routes: Routes = [
	huntsConfig().route,
	addHuntConfig().route,
	{ path: 'hunts/:id', component: HuntComponent, data: { title: huntsConfig }, pathMatch: 'full' },
	{ path: 'hunts/:id/edit', component: HuntComponent, data: { title: huntsConfig }, pathMatch: 'full' },
	{ path: '**', redirectTo: huntsConfig().route.path },
];
