import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {
	Subject,
	fromEvent,
	debounceTime,
	distinctUntilChanged,
	map,
	Observable,
	takeUntil,
} from 'rxjs';
import { Device } from 'src/app/state/device/device.state';
import { PostingFacade } from 'src/app/state/posting/posting.facade';
import { PostingPayload } from 'src/app/state/posting/posting.state';
import { UserFacade } from 'src/app/state/user/user.facade';
import { User } from 'src/app/state/user/user.state';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.sass'],
})
export class CreateComponent implements OnInit {
	public user$: Observable<User | null>;
	public devices$: Observable<Device[] | null>;
	public deviceDetails$: Observable<Device | null>;

	public posting!: PostingPayload;
	private userEmail!: string;
	private deviceKey!: string;

	public completer$: Subject<void> = new Subject<void>();

	constructor(
		private fb: FormBuilder,
    private router: Router,
		private postingFacade: PostingFacade,
		private userFacade: UserFacade,
		private spinner: NgxSpinnerService
	) {
		this.user$ = this.userFacade.userData$;
		this.devices$ = this.postingFacade.devicesData$;
		this.deviceDetails$ = this.postingFacade.deviceDetails$;
	}

	ngOnInit(): void {}

	@ViewChild('searchInput') searchDevice!: ElementRef<HTMLInputElement>;

	ngAfterViewInit() {
		this.postingFacade.dataLoaded$.pipe(takeUntil(this.completer$)).subscribe({
			next: (loading: boolean) => {
				if (!loading) {
					this.spinner.show();
				} else {
					this.spinner.hide();
				}
			},
			error: (err: string | null) => console.log(err),
		});
		fromEvent(this.searchDevice.nativeElement, 'input')
			.pipe(
				debounceTime(1000),
				distinctUntilChanged(),
				takeUntil(this.completer$),
				map((e: Event) => (e.target as HTMLInputElement).value)
			)
			.subscribe({
				next: (res) => this.postingFacade.queryDevices(res, 50),
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
				updateOn: 'change',
			},
		],
	});

	get comments() {
		return this.postingForm.get(['comments']);
	}

	get price() {
		return this.postingForm.get(['price']);
	}

	createPosting(): void {
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
		this.postingFacade.createPosting(this.posting);
    this.router.navigate(['marketplace'])
	}

	fetchDeviceDetails(key: string): void {
		this.postingFacade.getDeviceDetails(key);
	}

	ngOnDestroy(): void {
		this.completer$.next();
		this.completer$.complete();
	}
}
