import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
	@Output() search = new EventEmitter<string>();
	@Output() create = new EventEmitter<string>();

	constructor(private fb: FormBuilder) {}

	searchForm = this.fb.group({
		query: [''],
	});

	get query() {
		return this.searchForm.get(['query']);
	}

	ngOnInit(): void {}

	onSubmit() {
		this.search.emit(this.query!.value);
		this.query?.reset();
	}

	onCreate() {
		this.create.emit('requesting create modal')
	}
}