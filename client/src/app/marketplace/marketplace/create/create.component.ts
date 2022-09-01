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
import { DeviceDetails } from 'src/app/shared/interfaces/Devices.interface';
import { DevicePostingPayload } from 'src/app/shared/interfaces/Posting.interface';
import { UserDetails } from 'src/app/shared/interfaces/User.interface';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.sass'],
})
export class CreateComponent implements OnInit, AfterViewInit {
	public display$!: Observable<boolean>;
	public posting: DevicePostingPayload | undefined;
	public detailedView: boolean = false;
	public detailedInfo: DeviceDetails | undefined;

	@Input() user: UserDetails | undefined;
	@Input() devices: DeviceDetails[] | undefined;
	@Output() requestDetails = new EventEmitter<string>();
	@Output() createPosting = new EventEmitter<DevicePostingPayload>();

	@ViewChild('searchInput') searchDevice!: ElementRef<HTMLInputElement>;

	constructor(private modal: ModalService, private fb: FormBuilder) {}

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

	ngOnInit(): void {
		this.display$ = this.modal.watch();
	}

	ngAfterViewInit() {
		fromEvent(this.searchDevice.nativeElement, 'input')
			.pipe(
				debounceTime(1000),
				distinctUntilChanged(),
				map((e: Event) => (e.target as HTMLInputElement).value)
			)
			.subscribe({
				next: (res) => {
					this.detailedView = false;
					this.requestDetails.emit(res);
				},
				error: (err) => console.log(err),
			});
	}

	showDetails(key: string) {
		this.detailedView = true;
		this.detailedInfo = this.devices!.filter((x) => x.deviceKey == key)[0];
	}

	sendPosting(): void {
		this.posting = {
			userEmail: this.user!.email as string,
			deviceKey: this.detailedInfo!.deviceKey as string,
			comments: this.comments!.value,
			price: this.price!.value
		}
		this.createPosting.emit(this.posting);
		this.close()
	}

	resetForm() {
		this.postingForm.reset();
	}

	close(): void {
		this.modal.close();
		this.user = undefined;
		this.detailedView = false;
		this.devices = undefined;
		this.detailedInfo = undefined;
		this.searchDevice.nativeElement.value = '';
	}
}
