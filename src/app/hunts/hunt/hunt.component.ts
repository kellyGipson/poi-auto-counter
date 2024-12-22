import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, Observable } from 'rxjs';

@UntilDestroy()
@Component({
	selector: 'hunt',
	template: `
		{{ huntId$ | async }}
	`,
	imports: [CommonModule]
})
export class HuntComponent {
	huntId$: Observable<string | null>;

	constructor(private route: ActivatedRoute) {
		this.huntId$ = this.route.paramMap.pipe(
			untilDestroyed(this),
			map((map) => map.get('id')),
		);
	}
}
