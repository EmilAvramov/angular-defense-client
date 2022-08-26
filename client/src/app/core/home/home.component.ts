import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';

import { NgxSpinnerService } from 'ngx-spinner';

import {
	HomeRequest,
	LatestDevice,
	PopularDevice,
} from 'src/app/shared/interfaces/Home.interface';
import { server } from 'src/app/shared/variables/config';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
	latest: LatestDevice[] | undefined;
	popular: PopularDevice[] | undefined;
	refreshed: boolean = false;

	constructor(private http: HttpClient, private spinner: NgxSpinnerService) {}

	ngOnInit(): void {
		if (!this.refreshed) {
			this.http.get(`${server}/data/brands`).subscribe();
			this.http.get(`${server}/data/devices`).subscribe();
			this.refreshed = true;
		}
		this.spinner.show();
		this.http
			.get<HomeRequest>(`${server}/data/recommended`)
			.pipe(finalize(() => this.spinner.hide()))
			.subscribe({
				next: (value) => {
					this.latest = value.latest;
					this.popular = value.popular;
				},
				error: (err) => console.log(err.message),
			});
	}
}
