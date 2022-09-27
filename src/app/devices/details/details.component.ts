import { Component, Input } from '@angular/core';
import { Observable, take } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { Device } from 'src/app/state/device/device.state';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/core/confirm/confirm.component';

@Component({
	selector: 'app-modal',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.sass'],
})
export class DetailsComponent {
	public dialogRef!: MatDialogRef<ConfirmDialog> | null;
	public display$!: Observable<boolean>;

	@Input() details!: Device | null;

	constructor(private modal: ModalService, public dialog: MatDialog) {
		this.display$ = this.modal.watch();
	}

	close() {
		this.dialogRef = this.dialog.open(ConfirmDialog, { disableClose: false });
		this.dialogRef.componentInstance.loadData('message', 'ok', 'cancel');
		this.dialogRef.afterClosed().subscribe((response) => {
			if (response) {
				this.modal.close();
			}
			this.dialogRef = null;
		});
	}
}
