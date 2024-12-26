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

			transition('shakeLeft <=> neutral', [ animate('25ms') ]),
			transition('neutral <=> shakeRight', [ animate('25ms') ]),
		])
	]
})
export class PokeButtonComponent {
	@Input() disabled!: boolean;

	pokeballShakePosition: 'shakeLeft' | 'neutral' | 'shakeRight' = 'neutral';
	direction: 'forward' | 'backward' = 'forward';
	isActive = false;
	isActiveFalling = false;
	eventType = 'mouseup';
	mouseupEventHandler = () => {
		if (this.isActive) {
			this.timeoutIsActive();
		}
		this.removeMouseupEventListener();
	};

	constructor() {
		this.setShakeRight();
	}

	getCurrentAnimationState(): string {
		return this.pokeballShakePosition;
	}

	private removeMouseupEventListener(): void {
		document.removeEventListener(this.eventType, this.mouseupEventHandler);
	}

	onMouseDown(): void {
		if (!this.disabled) {
			this.isActive = true;

			this.removeMouseupEventListener();
			document.addEventListener(this.eventType, this.mouseupEventHandler);
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
