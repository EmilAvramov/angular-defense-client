import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Device } from 'src/app/state/device/device.state';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.sass'],
})
export class ModalComponent implements OnInit {
	public display$!: Observable<boolean>;

	@Input() details!: Device | null;
	@Output() closed = new EventEmitter<boolean>();

	constructor(private modal: ModalService) {}

	ngOnInit(): void {
		this.display$ = this.modal.watch();
	}

	close() {
		this.closed.emit(true);
		this.modal.close();
	}
}
