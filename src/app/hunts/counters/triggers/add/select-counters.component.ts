import { MatDialogActions, MatDialogClose, MatDialogTitle } from '@angular/material/dialog';
import { Component, inject } from '@angular/core';
import { SelectionListComponent } from '../../../../infrastructure/selection-list/selection-list.component';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'select-counters',
	template: `
		<h2 mat-dialog-title>Select Counters</h2>

		<selection-list [items]="data.items" (selectedIds)="onIdsSelected($event)"></selection-list>

		<mat-dialog-actions>
			<button mat-button mat-dialog-close>Cancel</button>
			<button mat-button [mat-dialog-close]="selectedIds" cdkFocusInitial>Ok</button>
		</mat-dialog-actions>
	`,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, SelectionListComponent],
})
export class SelectCountersComponent {
	data = inject(DIALOG_DATA);
	selectedIds: string[] = [];

	onIdsSelected(ids: string[]) {
		this.selectedIds = ids || [];
	}
}
