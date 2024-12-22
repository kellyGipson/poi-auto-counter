import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map, Observable, switchMap, take, tap } from "rxjs";
import { Hunt } from "../../infrastructure/auto-counter/hunt";
import { PollService } from "../../poll/poll.service";

@UntilDestroy()
@Injectable()
export class HuntService {
	constructor(
		private route: ActivatedRoute,
		private pollService: PollService,
	) {}

	huntByRouteParams$(): Observable<Hunt | undefined> {
		return this.pollService.poll$().pipe(
			untilDestroyed(this),
			switchMap((poll) =>
				this.route.paramMap.pipe(
					take(1),
					map((map) => {
						const id = map.get('id');
						if (!id) {
							throw new Error('NO ID');
						}
						return id;
					}),
					map((id) => (poll?.hunts || []).find((hunt) => hunt?.id === id)),
				)
			),
		);
	}
}
