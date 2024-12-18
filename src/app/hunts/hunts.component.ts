import { Component, OnInit } from '@angular/core';
import { electronApi } from '../electron/electron-api';
import { Counter } from './counter';
import { PollService } from '../poll/poll.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';
import { Method } from './hunting-method';
import { Game } from './hunt-game';
import { Version } from './game-version';
import { Hunt } from './hunt';
import { HuntFormComponent } from './new-hunt/new-hunt-form.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HuntForm } from './new-hunt/new-hunt-form';
import { debounce } from '../utils/debounce';
import { HuntCardComponent } from './hunt/hunt-card.component';

@UntilDestroy()
@Component({
	selector: 'hunts',
	template: `
		<div class="gap-4 h-min">
			<div class="flex flex-col gap-4">
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

				<div
					class="h-0 scale-y-0 transition-all"
					[class.scale-y-100]="isNewHuntVisible"
					[class.!h-full]="isNewHuntVisible"
					[class.translate-y-[-50%]]="!isNewHuntVisible"
				>
					<hunt-form [formGroup]="formGroup">
						<button
							addHuntButton
							mat-raised-button
							class="shrink-0"
							[disabled]="!formGroup.valid"
							(click)="onAdd()"
						>Add Hunt</button>
					</hunt-form>
				</div>
			</div>

			<div>
				
				@for (hunt of hunts; track hunt.id) {
					<hunt-card [hunt]="hunt"></hunt-card>
				} @empty {
					no hunts yet
				}
			</div>
		</div>
	`,
	imports: [HuntFormComponent, CommonModule, MatButtonModule, HuntCardComponent],
})
export class HuntsComponent implements OnInit {
	hunts: Hunt[] = [];
	openFolderDebounceActive = false;
	isNewHuntVisible = false;
	formGroup = new FormGroup({
		species: new FormControl<string>('', [Validators.required]),
		counters: new FormArray([
			new FormGroup({
				count: new FormControl<number>(0, [Validators.required]),
				interval: new FormControl<number>(1, [Validators.required, Validators.min(1)]),
				method: new FormControl<string>('', [Validators.required]),
				games: new FormArray([
					new FormGroup({
						version: new FormControl<string>('', [Validators.required]),
						location: new FormControl<string>('', [Validators.required]),
						caught: new FormControl<boolean>(false, [Validators.required]),
						found: new FormControl<boolean>(false, [Validators.required]),
					}),
				]),
			}),
		]),
	}) as HuntForm;

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
		this.isNewHuntVisible = !this.isNewHuntVisible;
	}

	onAdd(): void {
		const { species, counters } = this.formGroup.value;
		const ctrs = (counters || []).map((c) =>
			new Counter(
				c.count || 0, // TODO ABSTRACT ALL OF THIS FOR THE LOVE OF GOD
				c.interval || 1,
				c.method || Method.fullOdds,
				(c.games || []).map((g) =>
					new Game(
						g.version || Version.colosseum,
						g.location || 'Realgam Tower',
						g.caught || false,
						g.found || false,
					)
				)
			)
		)
		electronApi.addHunt(new Hunt(species || 'Metagross', ctrs));
	}
}
