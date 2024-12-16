import { Component, OnInit } from '@angular/core';
import { electronApi } from '../electron/electron-api';
import { Counter } from './counter';
import { PollService } from '../poll/poll.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, tap } from 'rxjs';
import { Method } from './hunting-method';
import { HuntGame } from './hunt-game';
import { Version } from './game-version';
import { Hunt } from './hunt';
import { HuntFormComponent } from './new-hunt/new-hunt-form.component';

@UntilDestroy()
@Component({
	selector: 'hunts',
	template: `
		<div class="flex flex-col">
			<button (click)="onAdd()">New Hunt</button>

			<div class="my-8">
				<hunt-form></hunt-form>
			</div>
		
			@for (hunt of hunts; track hunt.id) {
				{{ hunt.id }}
			} @empty {
				no hunts yet
			}
		</div>
	`,
	providers: [PollService],
	imports: [HuntFormComponent],
})
export class HuntsComponent implements OnInit {
	hunts: Hunt[] = [];
	
	constructor(private pollService: PollService) {}
	
	ngOnInit(): void {
		this.pollService.poll$().pipe(
			untilDestroyed(this),
			map((poll) => poll.hunts),
			tap((hunts) => {
				this.hunts = hunts;
			})
		).subscribe();
	}

	onAdd(): void {
		electronApi.addHunt(
			new Hunt(
				'Rayquaza',
				[ new Counter(0, 1, Method.fullOdds, [new HuntGame(Version.black, false, false)]) ]
			)
		);
	}
}
