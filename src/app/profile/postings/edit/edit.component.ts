import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	Output,
} from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { Posting } from 'src/app/state/posting/posting.state';
import { UserFacade } from 'src/app/state/user/user.facade';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/core/confirm/confirm.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.sass'],
})
export class EditComponent implements AfterViewInit, OnDestroy {
	public completer$: Subject<void> = new Subject<void>();
	public display$!: Observable<boolean>;

	@Input() details$: Observable<Posting | null> | undefined;
	@Output() editPosting = new EventEmitter<{
		id: number;
		comments: string;
		price: number;
	}>();
	@Output() deletePosting = new EventEmitter<number>();

	constructor(
		private editModal: ModalService,
		public userFacade: UserFacade,
		public dialog: MatDialog,
		public fb: FormBuilder,
		private cdr: ChangeDetectorRef
	) {
		this.display$ = this.editModal.watch();
	}
	ngAfterViewInit(): void {
		this.details$
			?.pipe(
				takeUntil(this.completer$),
				map((data: Posting | null) => {
					this.postingForm.patchValue({
						comments: data?.comments,
						price: String(data?.price),
					});
				})
			)
			.subscribe();
		this.cdr.detectChanges();
	}

	get comments() {
		return this.postingForm.get(['comments']);
	}

	get price() {
		return this.postingForm.get(['price']);
	}

	postingForm = this.fb.group({
		comments: [
			'',
			{
				validators: [Validators.required],
				updateOn: 'change',
			},
		],

		price: [
			'',
			{
				validators: [Validators.required],
				updateOn: 'change',
			},
		],
	});

	emitEdit(id: number) {
		this.editPosting.emit({
			id,
			comments: this.comments?.value,
			price: Number(this.price?.value),
		});
		this.editModal.close();
	}

	emitDelete(id: number) {
		const dialogRef: MatDialogRef<ConfirmDialog> = this.dialog.open(
			ConfirmDialog,
			{
				disableClose: false,
				width: '40vw',
				height: '21vh',
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

	ngOnDestroy(): void {
		this.completer$.next();
		this.completer$.complete();
	}
}
