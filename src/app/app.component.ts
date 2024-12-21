import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { Display, ScreenshotOptions } from './screenshot-desktop-types';
import { ReactiveFormsModule } from '@angular/forms';
import { PacHelpComponent } from './infrastructure/help/help.component';
import { ToolbarTriggerComponent } from './infrastructure/toolbar/toolbar-trigger.component';
import { ToolbarService } from './infrastructure/toolbar/toolbar.service';
import { ToolbarComponent } from './infrastructure/toolbar/toolbar.component';
import { LogTrayComponent } from './logging/log-tray.component';
import { Poll } from './poll/poll';
import { PollService } from './poll/poll.service';
import { electronApi } from './electron/electron-api';
import { Hunt } from './infrastructure/auto-counter/hunt';
import { IpcChannelMethods } from './infrastructure/electron/ipc-channels';

declare global {
  interface Window {
    electronAPI: { // use import "electronApi" from "src/app/electron/electron-api"
      [IpcChannelMethods.getVersion]: () => Promise<string>;
      [IpcChannelMethods.listDisplays]: () => Promise<Display[]>;
      [IpcChannelMethods.screenshot]: (options: ScreenshotOptions) => Promise<number[]>;
      [IpcChannelMethods.getPollObject]: () => Promise<Poll>;
      [IpcChannelMethods.removeAllLogs]: () => Promise<void>;
      [IpcChannelMethods.removeLog]: (logId: string) => Promise<void>;
      [IpcChannelMethods.addHunt]: (hunt: Hunt) => Promise<Hunt>;
      [IpcChannelMethods.openHuntsFolder]: () => Promise<void>;
    }
  }
}

@Component({
  selector: 'app-root',
  imports: [
		RouterOutlet,
		CommonModule,
		MatSelectModule,
		ReactiveFormsModule,
		PacHelpComponent,
		ToolbarComponent,
		ToolbarTriggerComponent,
		LogTrayComponent,
	],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'poi-auto-counter';
	versionPromise = electronApi.getVersion();

	constructor(
		public toolbarService: ToolbarService,
		pollService: PollService,
	) {
		pollService.startPolling();
	}
}
