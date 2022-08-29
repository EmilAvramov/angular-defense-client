import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceDetails } from 'src/app/shared/interfaces/Devices.interface';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.sass'],
})
export class CreateComponent implements OnInit {
	public display$!: Observable<boolean>;

	@Input() details: DeviceDetails | undefined;
	@Output() closed = new EventEmitter<boolean>();
  @Output() requestDetails = new EventEmitter<string>();

	constructor(private modal: ModalService) {}

	ngOnInit(): void {
		console.log(this.details);
		this.display$ = this.modal.watch();
	}

	close() {
		this.closed.emit(true);
		this.modal.close();
	}
}
