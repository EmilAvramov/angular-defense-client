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
import { DevicePosting } from 'src/app/shared/interfaces/Posting.interface';
import { UserDetails } from 'src/app/shared/interfaces/User.interface';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.sass'],
})
export class CreateComponent implements OnInit, AfterViewInit {
	public display$!: Observable<boolean>;
	public posting: DevicePosting | undefined;

	@Input() user: UserDetails | undefined;
	@Input() devices: DeviceDetails[] | undefined;
	@Output() closed = new EventEmitter<boolean>();
	@Output() requestDetails = new EventEmitter<string>();
	@Output() createPosting = new EventEmitter<DevicePosting>();

	@ViewChild('searchInput')
	searchDevice!: ElementRef<HTMLInputElement>;

	constructor(private modal: ModalService, private fb: FormBuilder) {}

	ngOnInit(): void {
		this.display$ = this.modal.watch();
		this.display$.subscribe(console.log);
	}

	ngAfterViewInit() {
		fromEvent(this.searchDevice?.nativeElement, 'input')
			.pipe(
				debounceTime(1000),
				distinctUntilChanged()
			)
			.subscribe(console.log);
	}

	sendPosting(): void {
		this.createPosting.emit(this.posting);
	}

	close(): void {
		this.closed.emit(true);
		this.modal.close();
		this.user = undefined;
		this.devices = undefined;
	}
}
