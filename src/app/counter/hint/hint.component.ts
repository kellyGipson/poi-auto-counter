import { Component } from '@angular/core';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { OverlayModule } from '@angular/cdk/overlay';
import { InfoBoxComponent } from '../../shared/info-box/info-box.component';

@Component({
	selector: 'counter-hint',
	template: `
		<button
			type="button"
			mat-icon-button
			cdkOverlayOrigin
			#trigger="cdkOverlayOrigin"
			(click)="isOpen = !isOpen"
		>
			<fa-icon [icon]="faCircleInfo" size="2x"></fa-icon>
		</button>

		<!-- This template displays the overlay content and is connected to the button -->
		<ng-template
			cdkConnectedOverlay
			[cdkConnectedOverlayOrigin]="trigger"
			[cdkConnectedOverlayOpen]="isOpen"
			[cdkConnectedOverlayHasBackdrop]="true"
			(backdropClick)="isOpen = false"
		>
			<info-box>
				<li>[ENTER, SPACE] -> increment counter</li>
				<li>[0] -> decrement counter</li>
			</info-box>
		</ng-template>
	`,
	imports: [FontAwesomeModule, OverlayModule, InfoBoxComponent],
	styleUrl: './hint.component.scss',
})
export class CounterHintComponent {
  isOpen = false;
	faCircleInfo = faCircleInfo;
}
