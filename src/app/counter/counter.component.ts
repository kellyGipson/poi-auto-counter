import { Component, HostListener } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

@Component({
	selector: 'counter',
	template: `
		<div class="h-full w-full flex justify-center items-center">
			<div
				class="w-min gap-8 flex flex-col"
				[class.translate-y-[-6px]]="isIncrementing"
			>
				<div class="w-full flex justify-center">
					<div
						[class.text-6xl]="!isIncrementing"
						[class.text-7xl]="isIncrementing"
						[class.scale-100]="isIncrementing"
						[class.translate-y-[2px]]="isIncrementing"
					>{{count}}</div>
				</div>

				<div class="counter-buttons">
					<button class="btn dec" (click)="decrement()">-</button>

					<button class="btn inc" (click)="increment()" (mousedown)="preIncrement()">+</button>
				</div>
			</div>
		</div>
	`,
	imports: [MatButtonModule],
	styleUrl: './counter.component.scss',
})
export class CounterComponent {
	count = 0;
	step = 1;
	isIncrementing = false;

	@HostListener('window:keyup.0')
	decrement() {
		this.count -= this.step;
	}

	@HostListener('window:keyup.enter')
	@HostListener('window:keyup.space')
	increment() {
		this.count += this.step;
		this.isIncrementing = false;
	}

	@HostListener('window:keydown.enter')
	@HostListener('window:keydown.space')
	preIncrement() {
		this.isIncrementing = true;
	}
}
