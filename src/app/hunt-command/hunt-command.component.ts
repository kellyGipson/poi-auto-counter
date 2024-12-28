import { PageActionsDirective } from './../infrastructure/page/page-actions.directive';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HuntCardSelectedEvent } from '../hunts/hunt/card/card-selected-event';
import { MatButtonModule } from '@angular/material/button';
import { HuntTerminalComponent } from './hunt-terminal/hunt-terminal.component';
import { addTriggerConfig } from '../hunts/counters/triggers/add/add-trigger-config';

@Component({
	selector: 'hunt-command',
	template: `
		<div class="flex gap-4 flex-wrap">
			@for (huntEvent of selectedHuntEvents; track huntEvent?.hunt?.id) {
				<hunt-terminal [hunt]="huntEvent.hunt"></hunt-terminal>
			}
		</div>

		<div page-actions></div>
	`,
	imports: [MatButtonModule, PageActionsDirective, HuntTerminalComponent],
})
export class HuntCommandComponent {
	selectedHuntEvents: HuntCardSelectedEvent[];
	addTriggerTitle = addTriggerConfig().route.data.title;

	constructor(private router: Router) {
		this.selectedHuntEvents = this.router.getCurrentNavigation()?.extras?.state?.['selectedHunts'] || [];
	}
}
