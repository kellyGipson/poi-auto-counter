import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { UntilDestroy } from '@ngneat/until-destroy';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@UntilDestroy()
@Component({
	selector: 'counter',
	template: `
		<div class="h-full w-full flex justify-center items-center">
			<div
				class="w-min gap-8 flex flex-col"
				[class.translate-y-[-6px]]="isIncrementing"
			>
				<div class="w-full flex flex-col justify-center items-center gap-8">
					<div
						[class.text-6xl]="!isIncrementing"
						[class.text-7xl]="isIncrementing"
						[class.scale-100]="isIncrementing"
						[class.translate-y-[2px]]="isIncrementing"
					>{{count}}</div>

					<div class="flex items-center gap-4">
						<span class="shrink-0">Counter Steps:</span>
						<input class="bg-transparent border rounded-md w-16 px-2" type="number" [formControl]="stepFormControl" min="1"/>
					</div>
				</div>

				<div class="counter-buttons">
					<button class="btn dec" (click)="decrement()">-</button>

					<button class="btn inc" (click)="increment()">+</button>
				</div>
			</div>
		</div>
	`,
	imports: [ MatButtonModule, MatInputModule, ReactiveFormsModule ],
	styleUrl: './counter.component.scss',
})
export class CounterComponent {
	count = 0;
	isIncrementing = false;
	stepFormControl = new FormControl<number>(1, Validators.min(1));

	get step(): number {
		return this.stepFormControl?.value || 0;
	}

	@HostListener('window:keydown.0')
	decrement() {
		if (this.count - this.step < 0) {
			this.count = 0;
			return;
		}
		this.count -= this.step;
	}

	@HostListener('window:keydown.enter')
	@HostListener('window:keydown.space')
	increment() {
		this.isIncrementing = true;

		setTimeout(() => {
			this.count += this.step;
			this.isIncrementing = false;
		}, 50);
	}
}
