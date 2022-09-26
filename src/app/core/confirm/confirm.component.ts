import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';

@Component({
	selector: 'app-confirm',
	templateUrl: './confirm.component.html',
	styleUrls: ['./confirm.component.sass'],
})
export class ConfirmComponent {
	public display$!: Observable<boolean>;

	message!: string;
	btnOkText!: string;
	btnCancelText!: string;

	@Output() answer = new EventEmitter<boolean>();

	constructor(private modal: ModalService) {
		this.display$ = this.modal.watch();
	}
	close() {
		this.modal.close();
	}

	confirm() {
		this.answer.emit(true);
		this.close();
	}

	cancel() {
		this.answer.emit(false);
		this.close();
	}

	loadData(message: string, ok: string, cancel: string) {
		this.message = message;
		this.btnOkText = ok;
		this.btnCancelText = cancel;
		this.modal.open();
	}
}
