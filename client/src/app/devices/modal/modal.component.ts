import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Device } from 'src/app/state/device/device.state';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.sass'],
})
export class ModalComponent {
	public display$!: Observable<boolean>;

	@Input() details!: Device | null;

	constructor(private modal: ModalService) {
		this.display$ = this.modal.watch();
	}

	close() {
		this.modal.close();
	}
}
