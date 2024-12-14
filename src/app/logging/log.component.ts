import { Component, Input, input, SecurityContext } from '@angular/core';
import { Log } from './log';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretRight, faClose, faCopy } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';
import { DomSanitizer } from '@angular/platform-browser';
import { electronApi } from '../electron/electron-api';
import { LogType } from './log-types';

@Component({
	selector: 'log',
	templateUrl: './log.component.html',
	styleUrl: './log.component.scss',
	imports: [FontAwesomeModule, CommonModule, ClipboardModule],
})
export class LogComponent {
	private _log?: Log | undefined;
	@Input()
	get log(): Log | undefined {
		return this._log;
	}
	set log(value: Log | undefined) {
		this._log = value;
		this.sanitizedLogDetails = this.domSanitizer.sanitize(SecurityContext.HTML, this.log?.details || '') || '';
	}

	closeIcon = faClose;
	expandIcon = faCaretRight;
	copyIcon = faCopy;
	
	electronApi = electronApi;
	isExpanded = false;
	logType = LogType;
	sanitizedLogDetails = '';

	constructor(private clipboard: Clipboard, public domSanitizer: DomSanitizer) {}
	
	onCopy() {
		const prettyLogDump = JSON.stringify(this.log, null, 2);
		this.clipboard.copy(prettyLogDump);
	}
}
