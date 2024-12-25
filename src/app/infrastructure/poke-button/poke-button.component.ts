import { animate, state, style, transition, trigger } from "@angular/animations";
import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatRippleModule } from "@angular/material/core";

@Component({
	selector: 'poke-button',
	templateUrl: './poke-button.component.html',
	imports: [CommonModule, MatRippleModule],
	animations: [
		trigger('pokeballShake', [
			state('shakeLeft', style({ transform: 'rotate(-15deg)'})),
			state('neutral', style({ transform: 'rotate(0deg)'})),
			state('shakeRight', style({ transform: 'rotate(15deg)'})),

			transition('shakeLeft <=> neutral', [ animate('100ms') ]),
			transition('neutral <=> shakeRight', [ animate('100ms') ]),
		])
	]
})
export class PokeButtonComponent {
	@Input() disabled!: boolean;

	pokeballShakePosition: 'shakeLeft' | 'neutral' | 'shakeRight' = 'neutral';
	direction: 'forward' | 'backward' = 'forward';
	isActive = false;
	isActiveFalling = false;

	constructor() {
		this.setShakeRight();
	}

	getCurrentAnimationState(): string {
		return this.pokeballShakePosition;
	}

	onMouseDown(): void {
		if (!this.disabled) {
			this.isActive = true;
			setTimeout(() => {
				if (this.isActive) {
					this.timeoutIsActive();
				}
			}, 3000);
		}
	}

	timeoutIsActive(): void {
		if (!this.disabled) {
			this.isActive = false;
			this.isActiveFalling = true;
			setTimeout(() => {
				this.isActiveFalling = false;
			}, 1000);
		}
	}

	setShakeLeft(): void {
		this.pokeballShakePosition = 'shakeLeft';
		setTimeout(() => {
			this.setNeutral();
		}, 100);
	}

	setNeutral(): void {
		this.pokeballShakePosition = 'neutral';
		setTimeout(() => {
			if (this.direction === 'forward') {
				this.setShakeRight();
				this.direction = 'backward';
			} else {
				this.setShakeLeft();
				this.direction = 'forward';
			}
		}, 1000);
	}

	setShakeRight(): void {
		this.pokeballShakePosition = 'shakeRight';
		setTimeout(() => {
			this.setNeutral();
		}, 100);
	}
}
