import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Display } from '../../screenshot-desktop-types';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { electronApi } from '../../electron/electron-api';

@Component({
	selector: 'screen-selector',
	template: `
		<div class="w-min flex flex-col gap-4">
			<mat-select [formControl]="displayFormControl">
				@for (display of displayList; track display.id; let idx = $index) {
					<mat-option [value]="display.id">Display {{ idx + 1 }} ({{ display.width }}x{{ display.height }})</mat-option>
				}
			</mat-select>

			<button mat-raised-button (click)="onClick()">get screenshot</button>
		</div>

		<img *ngIf="screenshot" [src]="screenshot">
	`,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatSelectModule,
		MatButtonModule,
	],
})
export class ScreenSelectorComponent {
	screenshot?: SafeResourceUrl;
	displayFormControl = new FormControl<string>('');
	displayList: Display[] = [];

	constructor(private domSanitizer: DomSanitizer) {}

	async ngOnInit(): Promise<void> {
		const displayList = await electronApi.listDisplays();

		displayList.sort((a, b) => {
			const aIdNum = +(a.id.at(a.id.length - 1) || '0');
			const bIdNum = +(b.id.at(b.id.length - 1) || '0');
			return bIdNum - aIdNum;
		});

		this.displayList = displayList;
		if (this.displayList.length > 0) {
			this.displayFormControl.setValue(this.displayList[0].id);
		}
	}

	onClick(): void {
		if (this.displayFormControl.value) {
			electronApi.screenshot({ format: 'png', screen: this.displayFormControl.value })
				.then((buffer) => {
					this.screenshot = this.convertBufferToImage(buffer);
				});
		}
	}

  convertBufferToImage(buffer: number[]): SafeResourceUrl {
		if (buffer) {
			return this.domSanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64,${btoa(buffer.reduce((data, byte) => data + String.fromCharCode(byte), ''))}`);
		} else {
			return '';
		}
  }
}
