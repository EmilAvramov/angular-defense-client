import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Posting } from 'src/app/state/posting/posting.state';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.sass'],
})
export class ListComponent implements OnInit {
	@Input() postings!: Posting[] | null;
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
