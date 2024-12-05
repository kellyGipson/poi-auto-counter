import { Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { HomeComponent } from './home/home.component';
import { AutoCounterComponent } from './auto-counter/auto-counter.component';

export const routes: Routes = [
	{
		path: 'home',
		component: HomeComponent,
	},
	{
		path: 'counter',
		component: CounterComponent,
	},
	{
		path: 'auto-counter',
		component: AutoCounterComponent,
	},
	{
		path: '**',
		redirectTo: 'home'
	},
];
