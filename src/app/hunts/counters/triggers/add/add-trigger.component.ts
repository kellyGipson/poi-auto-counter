import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TriggerSelectedEvent } from './../trigger-selector/trigger-selected-event';
import { Component, inject } from '@angular/core';
import { PageActionsDirective } from '../../../../infrastructure/page/page-actions.directive';
import { addTriggerConfig } from './add-trigger-config';
import { TriggerSelectorComponent } from '../trigger-selector/trigger-selector.component';
import { electronApi } from '../../../../electron/electron-api';
import { Router } from '@angular/router';
import { getSelectedHunts } from '../../../../utils/get-selected-hunts';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { HuntCardSelectedEvent } from '../../../hunt/card/card-selected-event';
import { formatList } from '../../../../utils/format-list';
import { SelectCountersComponent } from './select-counters.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
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
	imports: [
		MatTooltipModule,
		MatButtonModule,
		MatFormFieldModule,
		MatDialogModule,
		MatSelectModule,
		ReactiveFormsModule,
		PageActionsDirective,
		TriggerSelectorComponent,
	],
})
export class AddTriggerComponent {
	addTriggerTitle = addTriggerConfig().route.data.title;
	triggerSelectedEvent!: TriggerSelectedEvent;
	dialog = inject(MatDialog);
	selectedHunts: HuntCardSelectedEvent[] = [];

	constructor(private router: Router) {
		this.selectedHunts = getSelectedHunts(this.router);
	}

	onNewTrigger(): void {
		const dialogRef = this.dialog.open(SelectCountersComponent, {
			data: {
				items: this.selectedHunts.flatMap((h) => h.hunt.counters.map(counter => ({
					id: counter.id,
					displayValue: `${h.hunt.species} - ${counter.count} ${counter.interval} ${counter.method} ${formatList(counter.games.map(g => `${g.version} ${g.location}`))}`
				})))
			}
		});

		dialogRef.afterClosed().pipe(untilDestroyed(this)).subscribe((selectedCounterIds: string[]) => {
			(selectedCounterIds || []).forEach((counterId) => {
				const hunt = this.selectedHunts.find((h) => h.hunt.counters.findIndex(c => c.id === counterId) !== -1)?.hunt;
				if (hunt?.id) {
					electronApi.addTrigger(hunt?.id, counterId, this.triggerSelectedEvent.trigger).then(() => console.log('hello'));
				}
			})
		});
	}

	onTriggerSelected(event: TriggerSelectedEvent): void {
		this.triggerSelectedEvent = event;
	}
}
