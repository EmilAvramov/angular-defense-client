import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-confirm',
	templateUrl: './confirm.component.html',
	styleUrls: ['./confirm.component.sass'],
})
export class ConfirmDialog {
	constructor(
		public dialogRef: MatDialogRef<ConfirmDialog>,
		@Inject(MAT_DIALOG_DATA)
		public data: { message: string; ok: string; cancel: string }
	) {}
}
