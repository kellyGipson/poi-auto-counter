import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

declare global {
  interface Window {
    electronAPI: {
      getVersion: () => Promise<string>;
    }
  }
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'poi-auto-counter';

	versionPromise = window.electronAPI.getVersion();

	constructor(private router: Router) {}
	
	ngOnInit(): void {
		this.router.navigate(['/counter']);
	}
}
