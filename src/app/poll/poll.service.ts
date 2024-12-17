import { Injectable } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Observable, interval, mergeMap, from, tap, BehaviorSubject, filter } from "rxjs";
import { electronApi } from "../electron/electron-api";
import { Poll } from "./poll";

@UntilDestroy()
@Injectable({ providedIn: 'root' })
export class PollService {
	pollSubject = new BehaviorSubject<Poll | null>(null);

	poll$(): Observable<Poll> {
		return this.pollSubject.asObservable().pipe(filter(poll => poll !== null));
	}

	startPolling(): void {
		interval(1000).pipe(
			untilDestroyed(this),
			mergeMap(() => from(electronApi.getPollObject())),
			tap((poll) => {
				this.pollSubject.next(poll);
			}),
		).subscribe();
	}
}
