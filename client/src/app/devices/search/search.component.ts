import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.sass'],
})
export class SearchComponent{
	@Output() search = new EventEmitter<string>();

	constructor(private fb: FormBuilder) {}

	searchForm = this.fb.group({
		query: [''],
	});

	get query() {
		return this.searchForm.get(['query']);
	}

	onSubmit() {
		this.search.emit(this.query!.value);
		this.query?.reset();
	}
}
