import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { faHeartCrack, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { Hunt } from '../../../infrastructure/auto-counter/hunt';
import { Router } from '@angular/router';
import { DeleteButtonComponent } from '../../../infrastructure/delete-button/delete-button.component';
import { electronApi } from '../../../electron/electron-api';
import { HuntCardSelectedEvent } from './card-selected-event';

@Component({
	selector: 'hunt-card',
	templateUrl: './card.component.html',
	styles: `
		span {
			text-wrap: nowrap;
		}
	`,
	imports: [
		MatCardModule,
		MatChipsModule,
		CommonModule,
		FontAwesomeModule,
		MatTooltipModule,
		MatButtonModule,
		DeleteButtonComponent,
	],
})
export class HuntCardComponent {
	@Input() hunt!: Hunt;

	@Output() selected = new EventEmitter<HuntCardSelectedEvent>();

	isSelected = false;
	shinyIcon = faStar;
	failedIcon = faHeartCrack;

	constructor(private router: Router) {}

	prettyDate(utcDate: string) {
		const date = new Date(utcDate);
		return `${date.getMonth()}/${date.getDay() < 10 ? '0' : ''}${date.getDay()}/${date.getFullYear()}`;
	}

	onHunt(hunt: Hunt): void {
		this.isSelected = !this.isSelected;
		this.selected.emit({ hunt, isSelected: this.isSelected });
	}

	onEdit(hunt: Hunt): void {
		this.router.navigate(['hunts', hunt?.id, 'edit']);
	}

	onDelete(hunt: Hunt): void {
		electronApi.deleteHunt(hunt?.id || '').then(() => {
			electronApi.reloadHuntsFolder();
		});
	}
}
