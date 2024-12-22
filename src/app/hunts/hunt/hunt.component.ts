import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { Hunt } from '../../infrastructure/auto-counter/hunt';
import { HuntService } from './hunt.service';
import { LightBulbComponent } from '../../merry-christmas-leeham/light-bulb.component';
import { LightswitchComponent } from './lightswitch.component';

@UntilDestroy()
@Component({
	selector: 'hunt',
	template: `
		{{ (hunt$ | async)?.lastModifiedDate }}
		<lightswitch (toggled)="bringOutDaKrimmusLights($event)"></lightswitch>
		<div class="flex flex-wrap">
			@for (color of colors; track $index) {
				<div class="w-16 h-16 flex justify-center items-center">
					<div
						class="origin-center"
						[style.transform]="'translate(' + color.left + 'em, ' + color.top + 'em) rotate(' + color.rotation + 'deg)'"
					>
						<light-bulb [brightness]="color.brightness" [color]="color.color" [lightsOn]="lightsOn"></light-bulb>
					</div>
				</div>
			}
		</div>
	`,
	imports: [CommonModule, LightBulbComponent, LightswitchComponent],
	providers: [HuntService]
})
export class HuntComponent {
	hunt$: Observable<Hunt | undefined>;
	rotationCarousel = new Carousel([0, 45, 90, 135, 180, 225, 270]);
	colorsCarousel = new Carousel(['yellow','green','orange','blue','red']);
	lightsOn = false;
	colors: {
    color: string;
    top: number;
    left: number;
    rotation: number;
    brightness: number;
	}[] = [];

	constructor(huntService: HuntService) {
		this.hunt$ = huntService.huntByRouteParams$();
		this.colorsCarousel = new Carousel(['yellow','green','orange','blue','red']);

		setInterval(() => {
			const colors = ['yellow','green','orange','blue','red'];
			shuffleArray(colors);
			this.colorsCarousel = new Carousel(colors);
			this.generateLights();
		}, 1000);
	}

	bringOutDaKrimmusLights(checked: boolean): void {
		this.lightsOn = checked;
	}

	generateColor() {
		const topLeftVariance = 1;
		return {
			color: this.colorsCarousel.next(),
			top: Math.random()*topLeftVariance,
			left: Math.random()*topLeftVariance,
			brightness: Math.random(),
			rotation: this.rotationCarousel.next(),
		};
	}

	generateLights(): void {
		this.colors = [
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
			this.generateColor(),
		]
	}
}

class Carousel<State> {
	private currentStateIndex = -1;
	
	constructor(public states: State[]) {}

	next(): State {
		this.currentStateIndex += 1;
		if (this.currentStateIndex > this.states?.length - 1) {
			this.currentStateIndex = -1;
		}
		return this.states?.[this.currentStateIndex];
	}
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
