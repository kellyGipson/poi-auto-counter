import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HuntFormComponent } from '../hunt/hunt-form.component';
import { HuntService } from '../hunt/hunt.service';
import { HuntForm } from '../hunt/hunt-form';
import { electronApi } from '../../electron/electron-api';
import { Hunt } from '../../infrastructure/auto-counter/hunt';
import { Counter } from '../counters/counter';
import { Game } from '../hunt-game';
import { Method } from '../hunting-method';
import { Version } from '../game-version';
import { editHuntConfig } from '../hunts-configs';
import { Observable, take, tap } from 'rxjs';

@Component({
	selector: 'edit-hunt',
	template: `
		<div class="flex justify-center items-center w-full">
			<div class="max-w-[2000px]">
				<hunt-form [formGroup]="formGroup">
					<button
						addHuntButton
						mat-raised-button
						class="shrink-0"
						[disabled]="!formGroup.valid"
						(click)="onEdit()"
					>{{ buttonText }}</button>
				</hunt-form>
			</div>
		</div>
	`,
	imports: [HuntFormComponent, MatButtonModule],
	providers: [HuntService],
})
export class EditHuntComponent {
	hunt$!: Observable<Hunt | undefined>;
	buttonText = editHuntConfig().route.data.title;
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

	constructor(huntService: HuntService) {
		huntService.huntByRouteParams$().pipe(
			take(1),
			tap((hunt) => {
				this.formGroup.setValue({
					species: hunt?.species || '',
					counters: (hunt?.counters || []).map((c) => ({
						count: c?.count,
						interval: c?.interval,
						method: c?.method,
						games: (c?.games || []).map((g) => ({
							version: g?.version,
							location: g?.location,
							caught: g?.caught,
							found: g?.found,
						})),
					}))
				})
			})
		).subscribe();
	}

	onEdit(): void {
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
				),
				[] // todo build triggers
			)
		)
		electronApi.addHunt(new Hunt(species || 'Metagross', ctrs));
	}
}
