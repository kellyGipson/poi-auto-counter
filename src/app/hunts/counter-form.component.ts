import { Component, Input } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CounterForm } from "./new-hunt/new-hunt-form";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";

@Component({
	selector: 'counter-form',
	template: `
		<div class="flex flex-col">
			<mat-form-field [appearance]="'fill'">
				<mat-label>Count</mat-label>
				<input matInput type="number" min="0" [formControl]="counter.controls.count">
			</mat-form-field>

			<mat-form-field [appearance]="'fill'">
				<mat-label>Interval</mat-label>
				<input matInput type="number" min="1" [formControl]="counter.controls.interval">
			</mat-form-field>

			<mat-form-field [appearance]="'fill'">
				<mat-label>Method</mat-label>
				<input matInput type="text" [formControl]="counter.controls.method">
			</mat-form-field>
		</div>
		
		<div class="flex flex-col">
			@for (game of counter.controls.games.controls; track $index) {
				<mat-form-field [appearance]="'fill'">
					<mat-label>Version</mat-label>
					<input matInput type="text" [formControl]="game.controls.version">
				</mat-form-field>

				<mat-form-field [appearance]="'fill'">
					<mat-label>Location</mat-label>
					<input matInput type="text" [formControl]="game.controls.location">
				</mat-form-field>

				<div class="flex justify-between">
					<div class="flex gap-[20px]">
						<mat-checkbox [formControl]="game.controls.caught">Caught</mat-checkbox>
						<mat-checkbox [formControl]="game.controls.found">Found</mat-checkbox>
					</div>

					<ng-content select="[addHuntButton]"></ng-content>
				</div>
			}
		</div>
	`,
	imports: [
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
		MatCheckboxModule,
		CommonModule,
	],
})
export class CounterFormComponent {
	@Input() counter!: CounterForm;
}
