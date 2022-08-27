import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Device } from 'src/app/shared/interfaces/Devices.interface';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.sass'],
})
export class ListComponent implements OnInit {
	@Input() data: Device[] = [];
	@Output() request = new EventEmitter<string>();

	loadMore() {
		this.request.emit('request more data');
	}

	constructor(public modal: ModalService) {}

	ngOnInit(): void {}

	open() {
		this.modal.open();
	}
}
