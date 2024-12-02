import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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
export class AppComponent {
  title = 'poi-auto-counter';

	versionPromise = window.electronAPI.getVersion();
}
