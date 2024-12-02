import { Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';

export const routes: Routes = [
	{
		path: '**',
		redirectTo: 'counter'
	},
	{
		path: 'counter',
		component: CounterComponent,
	},
];
