import { ChangeDetectorRef, Component } from '@angular/core';
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

	constructor(
		public dialogRef: MatDialogRef<ConfirmDialog>,
		private cdr: ChangeDetectorRef
	) {}

	loadData(message: string, ok: string, cancel: string) {
		this.message = message;
		this.btnOkText = ok;
		this.btnCancelText = cancel;
	}

	close(state: boolean) {
		this.dialogRef.close(state);
		this.cdr.detectChanges();
	}
}
