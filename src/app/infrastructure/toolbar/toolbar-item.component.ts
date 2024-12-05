import { Component, Input } from '@angular/core';

@Component({
	selector: 'toolbar-item',
	template: `
		<div class="h-12 flex items-center pl-2 gap-3">
			<div class="bg-slate-400 h-8 w-1 transition-all" [class.w-3]="isHovering"></div>
			
			<ng-content></ng-content>
		</div>
	`
})
export class ToolbarItemComponent {
	@Input() isHovering = false;
}
