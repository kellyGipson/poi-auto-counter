import { Component, HostListener } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

@Component({
	selector: 'counter',
	template: `
		<div>
			<span>{{count}}</span>
			<button mat-raised-button color="secondary">+</button>
			<button mat-raised-button color="secondary">-</button>
		</div>
	`,
	imports: [MatButtonModule]
})
export class CounterComponent {
	count = 0;
	step = 1;

	@HostListener('window:keyup.enter')
	onEnter() {
		this.count += 1;
	}
}
