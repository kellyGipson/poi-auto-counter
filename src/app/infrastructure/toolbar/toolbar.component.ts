import { Component } from '@angular/core';
import { ToolbarItemComponent } from './toolbar-item.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
	selector: 'toolbar',
	template: `
		<toolbar-item routerLink="/home" routerLinkActive="active">Home</toolbar-item>
		<toolbar-item routerLink="/hunts" routerLinkActive="active">Hunts</toolbar-item>
		<toolbar-item routerLink="/counter" routerLinkActive="active">Counter</toolbar-item>
		<toolbar-item routerLink="/auto-counter" routerLinkActive="active">Auto Counter</toolbar-item>
	`,
	imports: [
		ToolbarItemComponent,
		RouterLink,
		RouterLinkActive,
	]
})
export class ToolbarComponent {}
