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

	constructor(
		private editModal: ModalService,
		public userFacade: UserFacade,
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

	ngOnDestroy(): void {
		this.completer$.next();
		this.completer$.complete();
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

	close() {
		this.editModal.close();
	}
}
