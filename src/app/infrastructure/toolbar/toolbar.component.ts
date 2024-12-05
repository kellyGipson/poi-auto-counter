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

		<toolbar-item
			[isHovering]="isAutoCounterHovering"
			(mouseenter)="isAutoCounterHovering = true"
			(mouseleave)="isAutoCounterHovering = false"
			routerLink="/auto-counter"
			routerLinkActive="active"
		>Auto Counter</toolbar-item>
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
	isAutoCounterHovering = false;
}
