import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceDetails } from 'src/app/shared/interfaces/Devices.interface';
import { UserDetails } from 'src/app/shared/interfaces/User.interface';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.sass'],
})
export class CreateComponent implements OnInit {
	public display$!: Observable<boolean>;

	@Input() user: UserDetails | undefined;
	@Input() device: DeviceDetails | undefined
	@Output() closed = new EventEmitter<boolean>();
	@Output() requestDetails = new EventEmitter<string>();

	constructor(private modal: ModalService) {}

	ngOnInit(): void {
		this.display$ = this.modal.watch();
	}

	getDevice(): void {
		this.requestDetails.emit('value')
	}

	close(): void {
		this.closed.emit(true);
		this.modal.close();
		this.user = undefined
		this.device = undefined
	}
}
