import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ToolbarService {
	isToolbarOpen = signal(true);
}
