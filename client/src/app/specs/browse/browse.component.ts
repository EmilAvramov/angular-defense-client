import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { server } from 'src/app/shared/variables/config';

@Component({
	selector: 'app-browse',
	templateUrl: './browse.component.html',
	styleUrls: ['./browse.component.sass'],
})
export class BrowseComponent implements OnInit {
	constructor(private http: HttpClient, private fb: FormBuilder) {}

	searchForm = this.fb.group({
		query: [''],
	});

	get query() {
		return this.searchForm.get(['query']);
	}

	ngOnInit(): void {}

	onSubmit() {
		const { query } = this.searchForm.value;
		const headers = { 'content-type': 'application/json' };

		this.http
			.post(
				`${server}/device/list/lg_k20_(2019)-9828`,
				{ headers: headers, responseType: 'json' }
			)
			.subscribe({
				next: (value) => console.log(value),
				error: (err) => console.log(err.message),
			});
		this.http.get(`${server}/data/recommended`).subscribe({
			next: (value) => console.log(value),
			error: (err) => console.log(err.message),
		});
	}
}
