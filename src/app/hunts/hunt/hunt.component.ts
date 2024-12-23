import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { Hunt } from '../../infrastructure/auto-counter/hunt';
import { HuntService } from './hunt.service';

@UntilDestroy()
@Component({
	selector: 'hunt',
	template: `
		{{ (hunt$ | async)?.id }}
	`,
	imports: [CommonModule],
	providers: [HuntService],
})
export class HuntComponent {
	hunt$: Observable<Hunt | undefined>;

	constructor(huntService: HuntService) {
		this.hunt$ = huntService.huntByRouteParams$();
	}
}
