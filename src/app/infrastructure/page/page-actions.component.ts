import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { PageActionsService } from './page-actions.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';

@UntilDestroy()
@Component({
	selector: 'page-actions',
	template: `<div #pageActions></div>`
})
export class PageActionsComponent {
	@ViewChild('pageActions', { read: ViewContainerRef }) pageActionsContainerRef!: ViewContainerRef;

	constructor(pageActionsService: PageActionsService) {
		pageActionsService.elementRef$().pipe(
			untilDestroyed(this),
			tap((elementRef) => {
				this.pageActionsContainerRef.element.nativeElement.innerHTML = '';
				this.pageActionsContainerRef.element.nativeElement.appendChild(elementRef.nativeElement);
			}),
		).subscribe();
	}
}
