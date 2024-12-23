import { Component, OnInit } from '@angular/core';
import { electronApi } from '../electron/electron-api';
import { PollService } from '../poll/poll.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';
import { Hunt } from '../infrastructure/auto-counter/hunt';
import { AddHuntFormComponent } from './add/add-form.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { debounce } from '../utils/debounce';
import { HuntCardComponent } from './hunt/card/card.component';

@UntilDestroy()
@Component({
	selector: 'hunts',
	template: `
		<div class="flex flex-col gap-4">
			<div class="flex gap-4">
				<span class="text-3xl font-bold">Hunts</span>

				<button
					mat-raised-button
					(click)="onOpenHuntsFolder()"
					[disabled]="openFolderDebounceActive"
					class="shrink-0"
				>Open Hunts Folder</button>

				<button
					class="shrink-0"
					mat-raised-button
					(click)="onNewHunt()"
				>New Hunt</button>
			</div>

			<div class="flex flex-wrap gap-2">
				@for (hunt of hunts; track hunt.id) {
					<hunt-card [hunt]="hunt"></hunt-card>
				} @empty {
					No hunts available
				}
			</div>
		</div>
	`,
	imports: [AddHuntFormComponent, CommonModule, MatButtonModule, HuntCardComponent],
})
export class HuntsComponent implements OnInit {
	hunts: Hunt[] = [];
	openFolderDebounceActive = false;

	constructor(private pollService: PollService) {}
	
	ngOnInit(): void {
		this.pollService.poll$().pipe(
			untilDestroyed(this),
			tap((poll) => {
				this.hunts = poll?.hunts || [];
			})
		).subscribe();
	}

	onOpenHuntsFolder(): void {
		this.openFolderDebounceActive = true;
		electronApi.openHuntsFolder();
		debounce(() => {
			this.openFolderDebounceActive = false;
		}, 5000);
	}

	onNewHunt(): void {
		// navigate to add route
	}
}
