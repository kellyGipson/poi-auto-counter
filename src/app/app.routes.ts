import { Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: 'counter',
		component: CounterComponent,
	},
	{
		path: '**',
		redirectTo: ''
	},
];
