import { trigger, transition, style, animate, state } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMinus, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'delete-button',
	template: `
		<button (click)="onClick()">
			<div [@animateDeleteIcon]="getConfirmMode()" class="relative origin-center">
				<div
					id="vertical"
					class="icon h-[3px] w-[14px] rounded-full right-0"
					[@icon]="getConfirmMode()" [@verticalIcon]="getConfirmMode()"
					[style.transform]="'translateY(3px) rotate(-90deg)'"
				></div>
				<div
					id="horizontal"
					class="icon h-[3px] w-[14px] rounded-full right-0"
					[@icon]="getConfirmMode()"
				></div>
			</div>
		</button>
	`,
	imports: [CommonModule, FontAwesomeModule],
	styles: `
		.icon {
			background-color: white;
			transition: 500ms;
		}
		#vertical {
			opacity: 0;
		}
	`,
	animations: [
		trigger('icon', [
			state('first', style({ backgroundColor: 'white' })),
			state('final', style({ backgroundColor: '#c34a4a' })),
		]),
		trigger('verticalIcon', [
			state('first', style({ opacity: 0 })),
			state('final', style({ opacity: 1 })),
		]),
		trigger('animateDeleteIcon', [
			state('first', style({})),
			state('final', style({ transform: 'rotate(-45deg)' })),
			transition('first => final', [
				animate('500ms'),
			]),
		]),
	]
})
export class DeleteButtonComponent {
	@Output() delete = new EventEmitter<void>();
	
	inConfirmMode = false;
	firstDeleteIcon = faMinus;
	finalDeleteIcon = faXmark;

	getConfirmMode() {
		return this.inConfirmMode ? 'final' : 'first';
	}

	onClick(): void {
		if (this.inConfirmMode) {
			this.delete.emit();
		}

		this.inConfirmMode = true;
	}
}
