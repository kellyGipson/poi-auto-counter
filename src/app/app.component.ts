import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { Display, ScreenshotOptions } from './screenshot-desktop-types';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PacHelpComponent } from './infrastructure/help/help.component';

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
	],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'poi-auto-counter';

	versionPromise = window.electronAPI.getVersion();
	screenshot?: SafeResourceUrl;
	displayList: Display[] = [];

	displayFormControl = new FormControl<string>('');

	constructor(private router: Router, private domSanitizer: DomSanitizer) {}

	async ngOnInit(): Promise<void> {
		this.router.navigate(['/counter']);
		const displayList = await window.electronAPI.listDisplays();

		displayList.sort((a, b) => {
			const aIdNum = +(a.id.at(a.id.length - 1) || '0');
			const bIdNum = +(b.id.at(b.id.length - 1) || '0');
			return bIdNum - aIdNum;
		});

		this.displayList = displayList;
		if (this.displayList.length > 0) {
			this.displayFormControl.setValue(this.displayList[0].id);
		}
		console.log(this.displayList);
	}

	onClick(): void {
		if (this.displayFormControl.value) {
			window.electronAPI.screenshot({ format: 'png', screen: this.displayFormControl.value })
				.then((buffer) => {
					this.screenshot = this.convertBufferToImage(buffer);
				});
		}
	}

  convertBufferToImage(buffer: number[]): SafeResourceUrl {
		if (buffer) {
			return this.domSanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64,${btoa(buffer.reduce((data, byte) => data + String.fromCharCode(byte), ''))}`);
		} else {
			return '';
		}
  }
}
