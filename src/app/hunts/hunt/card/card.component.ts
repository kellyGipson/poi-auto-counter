import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { faHeartCrack, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { Hunt } from '../../../infrastructure/auto-counter/hunt';
import { Router } from '@angular/router';

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
	],
})
export class HuntCardComponent {
	@Input() hunt!: Hunt;

	shinyIcon = faStar;
	failedIcon = faHeartCrack;

	constructor(private router: Router) {}

	prettyDate(utcDate: string) {
		const date = new Date(utcDate);
		return `${date.getMonth()}/${date.getDay() < 10 ? '0' : ''}${date.getDay()}/${date.getFullYear()}`;
	}

	onHunt(hunt: Hunt): void {
		this.router.navigateByUrl(`hunts/${hunt?.id}`);
	}
}
