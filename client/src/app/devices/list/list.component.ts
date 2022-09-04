import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Device } from 'src/app/state/device/device.state';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.sass'],
})
export class ListComponent {
	@Input() data!: Device[] | null;
	@Output() request = new EventEmitter<string>();
	@Output() details = new EventEmitter<string>();

	loadMore() {
		this.request.emit('request more data');
	}

	showDetails(deviceKey: string) {
		this.details.emit(deviceKey);
	}

	constructor() {}

	open(deviceKey: string) {
		this.showDetails(deviceKey);
	}
}
