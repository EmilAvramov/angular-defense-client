import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-confirm',
	templateUrl: './confirm.component.html',
	styleUrls: ['./confirm.component.sass'],
})
export class ConfirmDialog {
	message!: string;
	btnOkText!: string;
	btnCancelText!: string;

	constructor(public dialogRef: MatDialogRef<ConfirmDialog>) {}

	loadData(message: string, ok: string, cancel: string) {
		this.message = message;
		this.btnOkText = ok;
		this.btnCancelText = cancel;
	}
}
