import { Component } from '@angular/core';
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

	constructor(private modal: ModalService) {
		this.display$ = this.modal.watch();
	}
	close() {
		this.modal.close();
	}
}
