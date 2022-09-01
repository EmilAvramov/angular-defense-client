import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DevicePostingDetails } from 'src/app/shared/interfaces/Posting.interface';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.sass'],
})
export class ListComponent implements OnInit {
	@Input() postingData!: DevicePostingDetails[];
	@Output() request = new EventEmitter<string>();
	@Output() details = new EventEmitter<number>();

	loadMore() {
		this.request.emit('request more data');
	}

	showDetails(id: number) {
		this.details.emit(id);
	}

	constructor() {}

	ngOnInit(): void {}

	open(id: number) {
		this.showDetails(id);
	}
}
