import { Component, OnInit } from '@angular/core';
import { LogService } from './log.service';
import { CommonModule } from '@angular/common';
import { map, tap } from 'rxjs';
import { Log } from './log';
import { LogComponent } from './log.component';
import { electronApi } from '../electron/electron-api';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'log-tray',
	template: `
		<div class="flex flex-col gap-2 pl-2 pb-2 w-[600px]">
			<div [@listAnimation]="logs.length" *ngFor="let log of logs; trackBy: trackBy">
				<log [log]="log"></log>
			</div>

			<button
				*ngIf="logs.length || 0 > 0"
				class="error log log--error hover:bg-red-800 active:bg-red-900"
				(click)="electronApi.removeAllLogs()"
			>Close All</button>
		</div>
	`,
	styleUrl: './log.component.scss',
	imports: [CommonModule, LogComponent],
	providers: [LogService],
	animations: [
		trigger('listAnimation', [
			transition(':enter', [
				style({ opacity: 0 , height: '0'}),
				animate('200ms', style({ height: '*'})),
				animate('100ms', style({ opacity: 1 })),
			]),
			transition(':leave', [
				style({ opacity: 1, height: '*'}),
				animate('100ms', style({ opacity: 0 })),
				animate('200ms', style({ height: '0' })),
			])
		])
	]
})
export class LogTrayComponent implements OnInit {
	logs: Log[] = [];
	electronApi = electronApi;
	
	constructor(private logService: LogService) {}

	ngOnInit(): void {
		this.logService.getLogs$().pipe(
			map((logs) => logs.reverse()),
			tap((logs) => {
				this.logs = logs;
			})
		).subscribe();
	}

	trackBy(_: number, log: Log) {
		return log.id;
	}
}
