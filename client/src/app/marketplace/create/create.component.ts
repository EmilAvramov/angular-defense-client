import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnDestroy,
	Output,
	ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
	debounceTime,
	distinctUntilChanged,
	fromEvent,
	map,
	Observable,
	Subject,
	takeUntil,
} from 'rxjs';
import { Device } from 'src/app/state/device/device.state';
import { PostingPayload } from 'src/app/state/posting/posting.state';
import { User } from 'src/app/state/user/user.state';
import { PostingCreateService } from '../services/postingCreate.service';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.sass'],
})
export class CreateComponent implements AfterViewInit, OnDestroy {
	public display$!: Observable<boolean>;
	public posting!: PostingPayload;
	private userEmail!: string;
	private deviceKey!: string;

	public completer$: Subject<void> = new Subject<void>();

	@Input() user$: Observable<User | null> | undefined;
	@Input() devices$: Observable<Device[] | null> | undefined;
	@Input() deviceDetails$: Observable<Device | null> | undefined;
	@Output() requestDeviceList = new EventEmitter<string>();
	@Output() requestDeviceDetails = new EventEmitter<string>();
	@Output() createPosting = new EventEmitter<PostingPayload>();
	@Output() clearDetails = new EventEmitter<null>();

	@ViewChild('searchInput') searchDevice!: ElementRef<HTMLInputElement>;

	constructor(
		private createModal: PostingCreateService,
		private fb: FormBuilder
	) {
		this.display$ = this.createModal.watch();
	}

	ngAfterViewInit() {
		fromEvent(this.searchDevice.nativeElement, 'input')
			.pipe(
				debounceTime(1000),
				distinctUntilChanged(),
				map((e: Event) => (e.target as HTMLInputElement).value)
			)
			.subscribe({
				next: (res) => this.requestDeviceList.emit(res),
				error: (err) => console.log(err),
			});
	}

	postingForm = this.fb.group({
		comments: [
			'',
			{
				validators: [Validators.required],
				updateOn: 'blur',
			},
		],

		price: [
			'',
			{
				validators: [Validators.required],
				updateOn: 'blur',
			},
		],
	});

	get comments() {
		return this.postingForm.get(['comments']);
	}

	get price() {
		return this.postingForm.get(['price']);
	}

	sendPosting(): void {
		this.user$
			?.pipe(takeUntil(this.completer$))
			.subscribe((user: User | null) => (this.userEmail = user?.email as string));
		this.deviceDetails$
			?.pipe(takeUntil(this.completer$))
			.subscribe(
				(device: Device | null) => (this.deviceKey = device?.deviceKey as string)
			);
		this.posting = {
			userEmail: this.userEmail,
			deviceKey: this.deviceKey,
			comments: this.comments!.value,
			price: this.price!.value,
		};
		this.createPosting.emit(this.posting);
		this.close();
	}

	close(): void {
		this.createModal.close();
		this.searchDevice.nativeElement.value = '';
		this.postingForm.reset();
		this.clearDetails.emit();
	}

	openCreate(key: string): void {
		this.requestDeviceDetails.emit(key);
	}

	ngOnDestroy(): void {
		this.completer$.next();
		this.completer$.complete();
	}
}
