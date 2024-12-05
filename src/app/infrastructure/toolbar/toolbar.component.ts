import { Component } from '@angular/core';
import { ToolbarItemComponent } from './toolbar-item.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
	selector: 'toolbar',
	template: `
		<toolbar-item
			[isHovering]="isHomeHovering"
			(mouseenter)="isHomeHovering = true"
			(mouseleave)="isHomeHovering = false"
			routerLink="/home"
			routerLinkActive="active"
		>Home</toolbar-item>

		<toolbar-item
			[isHovering]="isCounterHovering"
			(mouseenter)="isCounterHovering = true"
			(mouseleave)="isCounterHovering = false"
			routerLink="/counter"
			routerLinkActive="active"
		>Counter</toolbar-item>
	`,
	imports: [
		ToolbarItemComponent,
		RouterLink,
		RouterLinkActive,
	]
})
export class ToolbarComponent {
	isHomeHovering = false;
	isCounterHovering = false;
}
