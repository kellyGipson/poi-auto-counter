import { Component } from "@angular/core";
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CounterFormComponent } from "../counter-form.component";
import { HuntForm } from "./new-hunt-form";

@Component({
	selector: 'hunt-form',
	template: `
		<div class="flex flex-col h-[500px] w-full bg-neutral-800 rounded-lg shadow-xl p-8">
			<mat-form-field>
				<input matInput type="text" placeholder="Pokemon Species" [formControl]="formGroup.controls.species">
			</mat-form-field>

			<div class="flex flex-col">
				@for (counter of formGroup.controls.counters.controls; track $index) {
					<counter-form [counter]="counter"></counter-form>
				}
			</div>
		</div>
	`,
	imports: [
		MatInputModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		CounterFormComponent,
	]
})
export class HuntFormComponent {
	formGroup: HuntForm;

	constructor() {
		this.formGroup = new FormGroup({
			species: new FormControl<string>('', [Validators.required]),
			counters: new FormArray([
				new FormGroup({
					count: new FormControl<number>(0),
					interval: new FormControl<number>(1, [Validators.required, Validators.min(1)]),
					method: new FormControl<string>(''),
					games: new FormArray([
						new FormGroup({
							version: new FormControl<string>(''),
							caught: new FormControl<boolean>(false),
							found: new FormControl<boolean>(false),
						}),
					]),
				}),
			]),
		}) as HuntForm;
	}
}
