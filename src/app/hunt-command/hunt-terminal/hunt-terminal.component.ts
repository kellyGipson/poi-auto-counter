import { Component, Input } from '@angular/core';
import { Hunt } from '../../infrastructure/auto-counter/hunt';
import { addTriggerConfig } from '../../hunts/counters/triggers/add/add-trigger-config';
import { MatButtonModule } from '@angular/material/button';
import { Counter } from '../../hunts/counters/counter';
import { Router } from '@angular/router';

@Component({
	selector: 'hunt-terminal',
	template: `
		<div class="flex flex-col text-center gap-4">
			<div class="text-xl"><span>{{ hunt.species }}</span></div>

			<div>
				@for (counter of hunt.counters; track counter.id) {
					<div class="flex flex-col gap-4">
						<div class="flex flex-col">
							<div>{{ counter.count }}</div>
							<div>{{ counter.interval }}</div>
							<div>{{ counter.method }}</div>

							@for (game of counter.games; track $index) {
								<div>{{ game.version }}</div>
								<div>{{ game.location }}</div>
							}
						</div>
					</div>
				}
			</div>
		</div>
	`, 
	imports: [MatButtonModule],
})
export class HuntTerminalComponent {
	@Input() hunt!: Hunt;

	addTriggerTitle = addTriggerConfig().route.data.title;

	constructor(private router: Router) {}

	onAddTrigger(counter: Counter): void {
		this.router.navigate([ 'hunts', this.hunt.id, 'counters', counter.id, 'add-trigger' ]);
	}
}
