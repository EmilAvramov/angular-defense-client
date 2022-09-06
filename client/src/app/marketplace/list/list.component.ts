import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Posting } from 'src/app/state/posting/posting.state';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.sass'],
})
export class ListComponent {
	@Input() postings!: Posting[] | null;
	@Output() requestMore = new EventEmitter<null>();
	@Output() requestDetails = new EventEmitter<number>();

	loadMore() {
		this.requestMore.emit();
	}

	showDetails(id: number) {
		this.requestDetails.emit(id);
	}

	constructor() {}
}
