import { Component } from '@angular/core';
import { ToolbarItemComponent } from './toolbar-item.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
	selector: 'toolbar',
	template: `
		<toolbar-item routerLink="/hunts" routerLinkActive="active">Hunts</toolbar-item>
	`,
	imports: [
		ToolbarItemComponent,
		RouterLink,
		RouterLinkActive,
	]
})
export class ToolbarComponent {}
