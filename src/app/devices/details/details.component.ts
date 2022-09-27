import { Component, Input } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { Device } from 'src/app/state/device/device.state';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/core/confirm/confirm.component';

@Component({
	selector: 'app-modal',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.sass'],
})
export class DetailsComponent {
	public display$!: Observable<boolean>;

	@Input() details!: Device | null;

	constructor(private modal: ModalService, public dialog: MatDialog) {
		this.display$ = this.modal.watch();
	}

	close() {
		const dialogRef = this.dialog.open(ConfirmDialog, { disableClose: false });
		dialogRef.componentInstance.loadData(
			'Are you sure you want to delete this posting?',
			'Yes, continue',
			'No, cancel'
		);
		dialogRef.afterClosed().pipe(
			take(1),
			map((result: boolean) => {
				if (result) {
					this.modal.close();
				}
			})
		).subscribe();
	}
}
