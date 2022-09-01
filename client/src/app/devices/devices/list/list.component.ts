import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeviceDetails } from 'src/app/shared/interfaces/Devices.interface';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.sass'],
})
export class ListComponent implements OnInit {
	@Input() data: DeviceDetails[] = [];
	@Output() request = new EventEmitter<string>();
	@Output() details = new EventEmitter<string>();

	loadMore() {
		this.request.emit('request more data');
	}

	showDetails(deviceKey: string) {
		this.details.emit(deviceKey);
	}

	constructor() {}

	ngOnInit(): void {}

	open(deviceKey: string) {
		this.showDetails(deviceKey);
	}
}
