import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Display } from '../../../../shared/screenshot-desktop-types';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { electronApi } from '../../../../electron/electron-api';
import { Coordinate } from '../../../../infrastructure/types/coordinate';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TriggerSelectedEvent } from './trigger-selected-event';
import { Trigger } from '../trigger';

@Component({
	selector: 'trigger-selector',
	template: `
		<div>
			<div class="flex gap-4 items-center">
				<mat-form-field>
					<mat-select [formControl]="displayFormControl">
						@for (display of displayList; track display.id; let idx = $index) {
							<mat-option [value]="display.id">Display {{ idx + 1 }} ({{ display.width }}x{{ display.height }})</mat-option>
						}
					</mat-select>
				</mat-form-field>

				<button mat-raised-button (click)="onClick()">
					<span class="text-nowrap">get screenshot</span>
				</button>
			</div>
				
			<div *ngIf="screenshot" class="relative flex-grow overflow-x-auto border">
				<img id="screenshot" [src]="screenshot" class="max-h-full min-h-[550px]" [style.height]="screenshotHeight">

				<div
					class="absolute w-full max-h-full min-h-[550px] top-0 z-index-10"
					[style.height]="screenshotHeight"
					[style.maxWidth]="screenshotEl?.width || 'unset'"
					(click)="onLeftClick($event)"
					(contextmenu)="onRightClick($event)"
				></div>
			</div>
		</div>

		<div
			*ngIf="
				leftClickCoords.y &&
				leftClickCoords.x &&
				rightClickCoords.y &&
				rightClickCoords.x
			"
			class="absolute border-2 border-red-400 pointer-events-none max-w-full"
			[style]="{
				top: lowerY() + 'px',
				left: lowerX() + 'px',
				bottom: 'calc(100% - ' + upperY() + 'px)',
				right: 'calc(100% - ' + upperX() + 'px)',
			}"
		></div>
	`,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatSelectModule,
		MatFormFieldModule,
		MatButtonModule,
	],
})
export class TriggerSelectorComponent {
	@Output() triggerSelected = new EventEmitter<TriggerSelectedEvent>();
	
	screenshot?: SafeResourceUrl;
	displayFormControl = new FormControl<string>('');
	displayList: Display[] = [];
	leftClickCoords: Coordinate = { x: 0, y: 0 };
	rightClickCoords: Coordinate = { x: 0, y: 0 };
	screenshotHeight = 'calc(100vh - 220px)';

	get screenshotEl() {
		return document.querySelector('#screenshot') as HTMLImageElement | null;
	}

	constructor(private domSanitizer: DomSanitizer) {}

	async ngOnInit(): Promise<void> {
		const displayList = await electronApi.listDisplays() as Display[];

		displayList.sort((a, b) => {
			const aIdNum = +(a.id.at(a.id.length - 1) || '0');
			const bIdNum = +(b.id.at(b.id.length - 1) || '0');
			return bIdNum - aIdNum;
		});

		this.displayList = displayList;
		if (this.displayList.length > 0) {
			this.displayFormControl.setValue(this.displayList[0].id);
		}

		this.onClick();
	}

	lowerX(): number {
		return (this.leftClickCoords.x < this.rightClickCoords.x) ? this.leftClickCoords.x : this.rightClickCoords.x;
	}

	lowerY(): number {
		return (this.leftClickCoords.y < this.rightClickCoords.y) ? this.leftClickCoords.y : this.rightClickCoords.y;
	}

	upperX(): number {
		return (this.leftClickCoords.x < this.rightClickCoords.x) ? this.rightClickCoords.x : this.leftClickCoords.x;
	}

	upperY(): number {
		return (this.leftClickCoords.y < this.rightClickCoords.y) ? this.rightClickCoords.y : this.leftClickCoords.y;
	}

	defaultOther(coordinate: Coordinate): void {
		if (this.leftClickCoords.x <= 0 || this.leftClickCoords.y <= 0) {
			this.leftClickCoords = { x: coordinate.x - 10, y: coordinate.y - 10 };
		}
		if (this.rightClickCoords.x <= 0 || this.rightClickCoords.y <= 0) {
			this.rightClickCoords = { x: coordinate.x + 10, y: coordinate.y + 10 };
		}
	}

	onLeftClick(event: Event): void {
		const mouseEvent = event as unknown as MouseEvent;
		this.leftClickCoords = { x: mouseEvent.clientX, y: mouseEvent.clientY };
		this.defaultOther(this.leftClickCoords);
		this.emit();
	}
	
	onRightClick(event: Event): void {
		const mouseEvent = event as unknown as MouseEvent;
		this.rightClickCoords = { x: mouseEvent.clientX + 1, y: mouseEvent.clientY + 1 };
		this.defaultOther(this.rightClickCoords);
		this.emit();
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
		if (buffer?.length) {
			const base64Image = btoa(buffer.reduce((data, byte) => data + String.fromCharCode(byte), ''));
			return this.domSanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${base64Image}`);
		} else {
			return '';
		}
  }

	private emit(): void {
		this.triggerSelected.emit({
			trigger: new Trigger(
				this.leftClickCoords,
				this.rightClickCoords,
				this.displayFormControl.value || '<MONITOR_ID_LOST>'
			)
		});
	}
}
