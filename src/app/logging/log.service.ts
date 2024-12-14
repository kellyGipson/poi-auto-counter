import { map, Observable } from "rxjs";
import { Log } from "./log";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Injectable } from "@angular/core";
import { PollService } from "../poll/poll.service";

@UntilDestroy()
@Injectable()
export class LogService {
	constructor(private pollService: PollService) {}
	
	getLogs$(): Observable<Log[]> {
		return this.pollService.poll$().pipe(
			untilDestroyed(this),
			map((poll) => poll.logs),
		);
	}
}
