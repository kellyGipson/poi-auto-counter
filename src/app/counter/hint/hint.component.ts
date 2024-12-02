import { Component } from '@angular/core';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
	selector: 'counter-hint',
	template: `
		<button mat-icon-button>
			<fa-icon [icon]="faCircleInfo" size="2x"></fa-icon>
		</button>
	`,
	imports: [FontAwesomeModule],
})
export class CounterHintComponent {
	faCircleInfo = faCircleInfo;
}
