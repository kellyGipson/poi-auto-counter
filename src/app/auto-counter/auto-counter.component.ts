import { Component } from '@angular/core';
import { ScreenSelectorComponent } from './screen-selector/screen-selector.component';

@Component({
	selector: 'auto-counter',
	template: `
		<div>
			<screen-selector></screen-selector>
		</div>
	`,
	imports: [
		ScreenSelectorComponent,
	],
})
export class AutoCounterComponent {
}
