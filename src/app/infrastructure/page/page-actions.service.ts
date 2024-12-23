import { ElementRef, Injectable } from "@angular/core";
import { BehaviorSubject, filter, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PageActionsService {
	private elementRef = new BehaviorSubject<ElementRef | null>(null);

	elementRef$(): Observable<ElementRef> {
		return this.elementRef.asObservable().pipe(filter((el) => el !== null));
	}

	registerPageActionsElement(elementRef: ElementRef): void {
		this.elementRef.next(elementRef);
	}
}
