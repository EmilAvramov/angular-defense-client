import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	ViewChild,
} from '@angular/core';
import { map, Observable } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { Posting } from 'src/app/state/posting/posting.state';
import { UserFacade } from 'src/app/state/user/user.facade';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/core/confirm/confirm.component';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.sass'],
})
export class EditComponent {
	public display$!: Observable<boolean>;

	@Input() details$: Observable<Posting | null> | undefined;
	@Output() editPosting = new EventEmitter<{
		id: number;
		comments: string;
		price: number;
	}>();
	@Output() deletePosting = new EventEmitter<number>();

	@ViewChild('comments') comments!: ElementRef<HTMLInputElement>;
	@ViewChild('price') price!: ElementRef<HTMLInputElement>;

	constructor(
		private editModal: ModalService,
		public userFacade: UserFacade,
		public dialog: MatDialog
	) {
		this.display$ = this.editModal.watch();
	}

	emitEdit(id: number) {
		this.editPosting.emit({
			id,
			comments: this.comments.nativeElement.value,
			price: Number(this.price.nativeElement.value),
		});
	}

	emitDelete(id: number) {
		const dialogRef: MatDialogRef<ConfirmDialog> = this.dialog.open(
			ConfirmDialog,
			{
				disableClose: false,
				width: '40vw',
				height: '16vh',
				data: {
					message: 'Are you sure you want to delete this posting?',
					ok: 'Yes, continue',
					cancel: 'No, cancel',
				},
			}
		);
		dialogRef
			.afterClosed()
			.pipe(
				map((result: boolean) => {
					if (result) {
						this.deletePosting.emit(id);
					}
				})
			)
			.subscribe();
	}
	close() {
		this.editModal.close();
	}
}
