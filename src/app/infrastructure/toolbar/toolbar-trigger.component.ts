import { Component, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ToolbarService } from './toolbar.service';

@Component({
	selector: 'toolbar-trigger',
	template: `
		<button
			class="!z-[9999]"
			mat-icon-button
			(click)="toolbarService.isToolbarOpen.set(!toolbarService.isToolbarOpen())"
		>
			<fa-icon [icon]="faBars" size="2x"></fa-icon>
		</button>
	`,
	imports: [
		FontAwesomeModule,
		MatButtonModule,
	],
})
export class ToolbarTriggerComponent {
	faBars = faBars;
	open = false;

	constructor(public toolbarService: ToolbarService) {}
}
