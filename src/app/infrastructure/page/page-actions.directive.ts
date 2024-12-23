import { AfterViewInit, Directive, ElementRef } from "@angular/core";
import { PageActionsService } from "./page-actions.service";

@Directive({
	selector: '[page-actions]',
})
export class PageActionsDirective implements AfterViewInit {
	constructor(
		private elementRef: ElementRef,
		private pageActionsService: PageActionsService,
	) {}

	ngAfterViewInit(): void {
		this.pageActionsService.registerPageActionsElement(this.elementRef);
	}
}
