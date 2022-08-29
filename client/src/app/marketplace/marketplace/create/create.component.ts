import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { DeviceDetails } from 'src/app/shared/interfaces/Devices.interface';
import { DevicePosting } from 'src/app/shared/interfaces/Posting.interface';
import { UserDetails } from 'src/app/shared/interfaces/User.interface';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.sass'],
})
export class CreateComponent implements OnInit {
	public display$!: Observable<boolean>;
	public posting: DevicePosting | undefined

	@Input() user: UserDetails | undefined;
	@Input() device: DeviceDetails | undefined
	@Output() closed = new EventEmitter<boolean>();
	@Output() requestDetails = new EventEmitter<string>();
	@Output() createPosting = new EventEmitter<DevicePosting>()

	constructor(private modal: ModalService, private fb: FormBuilder) {}

	searchForm = this.fb.group({
		query: [''],
	});

	get query() {
		return this.searchForm.get(['query']);
	}

	ngOnInit(): void {
		this.display$ = this.modal.watch();
	}

	getDevice(): void {
		this.requestDetails.emit(this.query!.value)
	}

	sendPosting(): void {
		this.createPosting.emit(this.posting)
	}

	close(): void {
		this.closed.emit(true);
		this.modal.close();
		this.user = undefined
		this.device = undefined
	}
}
