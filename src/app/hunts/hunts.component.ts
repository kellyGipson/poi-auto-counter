import { Component, OnInit } from '@angular/core';
import { electronApi } from '../electron/electron-api';
import { PollService } from '../poll/poll.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Hunt } from '../infrastructure/auto-counter/hunt';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { debounce } from '../utils/debounce';
import { HuntCardComponent } from './hunt/card/card.component';
import { Router } from '@angular/router';
import { addHuntConfig } from './hunts-configs';
import { PageActionsDirective } from '../infrastructure/page/page-actions.directive';
import { HuntCardSelectedEvent } from './hunt/card/card-selected-event';
import { PokeButtonComponent } from '../infrastructure/poke-button/poke-button.component';

@UntilDestroy()
@Component({
	selector: 'hunts',
	template: `
		<div class="flex flex-col gap-4">
			<div class="flex gap-4" page-actions>
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
				>{{ addHuntTitle }}</button>
			</div>

			<div class="flex flex-wrap justify-center gap-2">
				@for (hunt of hunts; track hunt.id) {
					<hunt-card [hunt]="hunt" (selected)="onHuntSelected($event)"></hunt-card>
				} @empty {
					No hunts available
				}
			</div>

			<div class="flex w-full justify-end">
				<div class="h-16 flex gap-4">
					<div class="flex items-end">
						<span>Go Hunt!</span>
					</div>
					<poke-button [disabled]="!(selectedHunts$ | async)?.length"></poke-button>
				</div>
			</div>
		</div>
	`,
	imports: [CommonModule, MatButtonModule, HuntCardComponent, PageActionsDirective, PokeButtonComponent],
})
export class HuntsComponent implements OnInit {
	hunts: Hunt[] = [];
	addHuntTitle = addHuntConfig().route.data.title;
	openFolderDebounceActive = false;

	private _selectedHunts = new BehaviorSubject<Record<string, HuntCardSelectedEvent> | null>(null);
	selectedHunts$ = this._selectedHunts.asObservable().pipe(
		map((huntsObj) => Object.values(huntsObj || {})),
		map((events) => events?.filter((event) => event?.isSelected))
	);

	constructor(
		private pollService: PollService,
		private router: Router,
	) {}
	
	ngOnInit(): void {
		electronApi.reloadHuntsFolder();
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
		this.router.navigate([ 'hunts', 'add' ]);
	}

	onHuntSelected(event: HuntCardSelectedEvent): void {
		if (!event?.hunt?.id) {
			throw new Error('HuntsComponent::onHuntSelected() no hunt id');
		} else {
			const selectedHunts = this._selectedHunts.value || {};
			selectedHunts[event.hunt.id] = event;
			this._selectedHunts.next(selectedHunts);
		}
	}

	onStartHunting(): void {
		this.router.navigate(['hunts']);
	}
}
