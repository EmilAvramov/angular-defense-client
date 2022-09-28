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
import { Posting } from 'src/app/state/posting/posting.state';
import { UserFacade } from 'src/app/state/user/user.facade';
import { FormBuilder, Validators } from '@angular/forms';
import { AuxModalService } from 'src/app/services/auxModal.service';

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
		private auxModal: AuxModalService,
		public userFacade: UserFacade,
		public fb: FormBuilder,
		private cdr: ChangeDetectorRef
	) {
		this.display$ = this.auxModal.watch();
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
		this.auxModal.close();
	}

	close() {
		this.auxModal.close();
	}

	ngOnDestroy(): void {
		this.completer$.next();
		this.completer$.complete();
	}
}
