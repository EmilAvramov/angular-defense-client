import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/devices/services/modal.service';
import { Device } from 'src/app/state/device/device.state';

@Component({
	selector: 'app-modal',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.sass'],
})
export class DetailsComponent {
	public display$!: Observable<boolean>;

	@Input() details!: Device | null;

	constructor(private modal: ModalService) {
		this.display$ = this.modal.watch();
	}

	close() {
		this.modal.close();
	}
}
