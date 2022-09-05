import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Posting } from 'src/app/state/posting/posting.state';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.sass'],
})
export class ListComponent {
	@Input() postings!: Posting[] | null;
	@Output() requestMore = new EventEmitter<string>();
	@Output() requestDetails = new EventEmitter<number>();

	loadMore() {
		this.requestMore.emit('request more data');
	}

	showDetails(id: number) {
		this.requestDetails.emit(id);
	}

	constructor() {}

	open(id: number) {
		this.showDetails(id);
	}
}
