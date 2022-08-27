import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from 'src/app/shared/interfaces/Devices.interface';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.sass'],
})
export class ModalComponent implements OnInit {
	public display$!: Observable<boolean>;

	@Input() details: Device | undefined;
	@Output() closed = new EventEmitter<boolean>();

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
