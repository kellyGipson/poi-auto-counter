import { Component } from '@angular/core';
import { ScreenSelectorComponent } from './screen-selector/screen-selector.component';

@Component({
	selector: 'auto-counter',
	template: `
		<screen-selector></screen-selector>
	`,
	imports: [
		ScreenSelectorComponent,
	],
})
export class AutoCounterComponent {
}
