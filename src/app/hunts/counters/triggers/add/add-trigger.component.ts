import { unwrap } from './../../../../utils/unwrap';
import { ActivatedRoute } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { TriggerSelectedEvent } from './../trigger-selector/trigger-selected-event';
import { Component } from '@angular/core';
import { PageActionsDirective } from '../../../../infrastructure/page/page-actions.directive';
import { addTriggerConfig } from './add-trigger-config';
import { TriggerSelectorComponent } from '../trigger-selector/trigger-selector.component';
import { electronApi } from '../../../../electron/electron-api';
import { Router } from '@angular/router';

@Component({
	selector: 'add-trigger',
	template: `
		<div class="flex gap-4" page-actions>
			<div [matTooltip]="!triggerSelectedEvent ? 'Select a region that should trigger your counter' : ''">
				<button
					class="shrink-0"
					mat-raised-button
					[disabled]="!triggerSelectedEvent"
					(click)="onNewTrigger()"
				>{{ addTriggerTitle }}</button>
			</div>
		</div>

		<div>
			<trigger-selector (triggerSelected)="onTriggerSelected($event)"></trigger-selector>
		</div>
	`,
	imports: [MatTooltipModule, MatButtonModule, PageActionsDirective, TriggerSelectorComponent],
})
export class AddTriggerComponent {
	addTriggerTitle = addTriggerConfig().route.data.title;
	triggerSelectedEvent?: TriggerSelectedEvent;

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
	) {}

	onNewTrigger(): void {
		if (this.triggerSelectedEvent?.trigger !== undefined) {
			const huntId = unwrap(this.activatedRoute.paramMap)?.get('huntId') || '<HUNT_ID_LOST>';
			const counterId = unwrap(this.activatedRoute.paramMap)?.get('counterId') || '<COUNTER_ID_LOST>';
			electronApi.addTrigger(huntId, counterId, this.triggerSelectedEvent.trigger).then(() => {
				this.router.navigate(['hunt-command']);
			});
		}
	}

	onTriggerSelected(event: TriggerSelectedEvent): void {
		this.triggerSelectedEvent = event;
	}
}
