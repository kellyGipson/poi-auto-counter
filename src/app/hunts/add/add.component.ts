import { Component } from '@angular/core';
import { AddHuntFormComponent } from './add-form.component';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HuntForm } from './hunt-form';
import { electronApi } from '../../electron/electron-api';
import { Hunt } from '../../infrastructure/auto-counter/hunt';
import { Counter } from '../counter';
import { Game } from '../hunt-game';
import { Method } from '../hunting-method';
import { Version } from '../game-version';

@Component({
	selector: 'add-hunt',
	template: `
		<add-form>
			<button
				addHuntButton
				mat-raised-button
				class="shrink-0"
				[disabled]="!formGroup.valid"
				(click)="onAdd()"
			>Add Hunt</button>
		</add-form>
	`,
	imports: [AddHuntFormComponent],
})
export class AddHuntComponent {
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
				),
				[] // todo build triggers
			)
		)
		electronApi.addHunt(new Hunt(species || 'Metagross', ctrs));
	}
}
