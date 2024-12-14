import { Injectable } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Observable, interval, mergeMap, from, tap, BehaviorSubject, filter } from "rxjs";
import { electronApi } from "../electron/electron-api";
import { Poll } from "./poll";

@UntilDestroy()
@Injectable()
export class PollService {
	pollSubject = new BehaviorSubject<Poll | null>(null);

	poll$(): Observable<Poll> {
		return this.pollSubject.asObservable().pipe(filter(poll => poll !== null));
	}

	startPolling(): void {
		interval(300).pipe(
			untilDestroyed(this),
			mergeMap(() => from(electronApi.getPollObject())),
			tap((poll) => {
				this.pollSubject.next(poll);
			}),
		);
	}

	stopPolling(): void {}
	
	getPoll$(): Observable<Poll> {
		return interval(300).pipe(
			untilDestroyed(this),
			mergeMap(() =>
				from(electronApi.getPollObject())
			),
		);
	}
}
