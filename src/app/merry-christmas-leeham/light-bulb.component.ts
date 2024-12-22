import { Component, Input } from '@angular/core';

@Component({
	selector: 'light-bulb',
	template: `
		<div
			class="relative"
			[style.filter]="'brightness(' + (lightsOn ? ((brightness * 100) + 75) : 100) + '%)'"
		>
			<div class="absolute z-[3]">
				<div
					class="border border-black rounded-full w-4 h-4"
					[style.background]="'radial-gradient(circle, white, rgba(255, 255, 255, 0))'"
					[style.background-color]="lightsOn ? color : 'white'"
				></div>
				
				<div class="flex justify-center w-full">
					<div class="bg-orange-400 h-1 w-2"></div>
				</div>
			</div>

			<div
				id="glow"
				[style.background]="'radial-gradient(circle, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0))'"
				[style.transform]="'translate(-8px, -8px)'"
				class="absolute w-8 h-8 rounded-full z-[1]"
			></div>
		</div>

		<div
			id="mask"
			[style.background-color]="'#2a272a'"
			[style.filter]="'brightness(100%) !important'"
			[style.transform]="'translate(-12px, 20px)'"
			[style.filter]="'brightness(100%) !imporant'"
			class="w-[30px] h-[10px] z-[2]"
		></div>
	`
})
export class LightBulbComponent {
	@Input() color!: string;
	@Input() brightness!: number;
	@Input() lightsOn!: boolean;
}
