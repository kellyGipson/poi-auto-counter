import { Component, EventEmitter, Output } from '@angular/core';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
	selector: 'lightswitch',
	template: `
		<mat-slide-toggle (change)="onToggle($event)"></mat-slide-toggle>
	`,
	imports: [MatSlideToggleModule]
})
export class LightswitchComponent {
	@Output() toggled = new EventEmitter();
	
	onToggle(event: MatSlideToggleChange): void {
		this.toggled.emit(event.checked);
	}
}
