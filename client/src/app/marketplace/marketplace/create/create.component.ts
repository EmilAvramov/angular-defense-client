import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
	debounceTime,
	distinctUntilChanged,
	fromEvent,
	map,
	Observable,
} from 'rxjs';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Device } from 'src/app/state/device/device.state';
import { PostingPayload } from 'src/app/state/posting/posting.state';
import { User } from 'src/app/state/user/user.state';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.sass'],
})
export class CreateComponent implements OnInit, AfterViewInit {
	public display$!: Observable<boolean>;
	public posting!: PostingPayload | null;

	@Input() user!: User | null;
	@Input() devices!: Device[] | null;
	@Input() deviceDetails!: Device | null;
	@Output() requestDeviceList = new EventEmitter<string>();
	@Output() requestDeviceDetails = new EventEmitter<string>();
	@Output() createPosting = new EventEmitter<PostingPayload>();
	@Output() clearDetails = new EventEmitter<null>();

	@ViewChild('searchInput') searchDevice!: ElementRef<HTMLInputElement>;

	constructor(private modal: ModalService, private fb: FormBuilder) {
		this.display$ = this.modal.watch();
	}

	ngOnInit(): void {}

	ngAfterViewInit() {
		fromEvent(this.searchDevice.nativeElement, 'input')
			.pipe(
				debounceTime(1000),
				distinctUntilChanged(),
				map((e: Event) => (e.target as HTMLInputElement).value)
			)
			.subscribe({
				next: (res) => {
					this.deviceDetails = null;
					this.requestDeviceList.emit(res);
				},
				error: (err) => console.log(err),
			});
	}

	postingForm = this.fb.group({
		comments: [''],
		price: [''],
	});

	get comments() {
		return this.postingForm.get(['comments']);
	}

	get price() {
		return this.postingForm.get(['price']);
	}

	sendPosting(): void {
		this.posting = {
			userEmail: this.user!.email as string,
			deviceKey: this.deviceDetails!.deviceKey as string,
			comments: this.comments!.value,
			price: this.price!.value,
		};
		this.createPosting.emit(this.posting);
		this.close();
	}

	close(): void {
		this.modal.close();
		this.searchDevice.nativeElement.value = '';
		this.clearDetails.emit()
	}

	openCreate(key: string): void {
		this.requestDeviceDetails.emit(key);
	}
}
