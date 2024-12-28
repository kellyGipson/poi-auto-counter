import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { SelectionListItem } from './selection-list-item';

@Component({
	selector: 'selection-list',
	template: `
		<mat-selection-list (selectionChange)="onSelectionChange($event)">
			@for (item of items; track item) {
				<mat-list-option [value]="item.id">{{ item.displayValue }}</mat-list-option>
			}
		</mat-selection-list>
	`,
	imports: [
		MatFormFieldModule,
		MatListModule,
		MatSelectModule,
	]
})
export class SelectionListComponent {
	@Input() items: SelectionListItem[] = [];

	@Output() selectedIds = new EventEmitter<string[]>();

	onSelectionChange(event: MatSelectionListChange): void {
		this.selectedIds.emit(event.options.map(o => o.value));
	}
}
