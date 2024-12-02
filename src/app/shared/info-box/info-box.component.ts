import { Component } from "@angular/core";

@Component({
	selector: 'info-box',
	template: `
		<div class="example-list">
			<ng-content></ng-content>
		</div>
	`,
	styles: `
		.example-list {
			border: solid 1px #444444;
			border-radius: 5px;
			background: #2b2a2a;
			padding: 10px;
			margin: 0;
		}
	`,
})
export class InfoBoxComponent {}
