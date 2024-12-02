import { Component, HostListener } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

@Component({
	selector: 'counter',
	template: `
		<div>
			<span>{{count}}</span>
			<button mat-flat-button color="secondary" (click)="increment()">+</button>
			<button mat-flat-button color="secondary" (click)="decrement()">-</button>
		</div>
	`,
	imports: [MatButtonModule]
})
export class CounterComponent {
	count = 0;
	step = 1;

	@HostListener('window:keyup.enter')
	@HostListener('window:keyup.space')
	increment() {
		this.count += this.step;
	}

	@HostListener('window:keyup.0')
	decrement() {
		this.count -= this.step;
	}
}
