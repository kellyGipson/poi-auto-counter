import { Component, Input } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CounterFormComponent } from "../counter-form.component";
import { HuntForm } from "./new-hunt-form";

@Component({
	selector: 'hunt-form',
	template: `
		<div class="flex flex-col w-full bg-neutral-800 rounded-lg shadow-xl p-8">
			<mat-form-field [appearance]="'fill'">
			<mat-label>Pokemon Species</mat-label>
				<input matInput type="text" [formControl]="formGroup.controls.species">
			</mat-form-field>

			<div class="flex flex-col">
				@for (counter of formGroup.controls.counters.controls; track $index) {
					<counter-form [counter]="counter">
						<ng-content select="[addHuntButton]" addHuntButton></ng-content>
					</counter-form>
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
	@Input() formGroup!: HuntForm;
}
