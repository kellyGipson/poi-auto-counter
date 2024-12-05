import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { Display, ScreenshotOptions } from './screenshot-desktop-types';
import { ReactiveFormsModule } from '@angular/forms';
import { PacHelpComponent } from './infrastructure/help/help.component';
import { ToolbarTriggerComponent } from './infrastructure/toolbar/toolbar-trigger.component';
import { ToolbarService } from './infrastructure/toolbar/toolbar.service';
import { ToolbarComponent } from './infrastructure/toolbar/toolbar.component';

declare global {
  interface Window {
    electronAPI: {
      getVersion: () => Promise<string>;
      listDisplays: () => Promise<Display[]>;
      screenshot: (options: ScreenshotOptions) => Promise<number[]>;
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
	],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'poi-auto-counter';
	versionPromise = window.electronAPI.getVersion();

	constructor(
		private router: Router,
		public toolbarService: ToolbarService,
	) {}

	ngOnInit() {
		this.router.navigate(['/counter']);
	}
}
