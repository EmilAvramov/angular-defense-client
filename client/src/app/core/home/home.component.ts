import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize, Subject, takeUntil } from 'rxjs';

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
export class HomeComponent implements OnInit, OnDestroy {
	latest: LatestDevice[] | undefined;
	popular: PopularDevice[] | undefined;

	public completer$: Subject<void> = new Subject<void>();

	constructor(private http: HttpClient, private spinner: NgxSpinnerService) {}

	ngOnInit(): void {
		this.spinner.show();
		this.http
			.get<HomeRequest>(`${server}/data/recommended`)
			.pipe(
				finalize(() => this.spinner.hide()),
				takeUntil(this.completer$)
			)
			.subscribe({
				next: (value) => {
					this.latest = value.latest;
					this.popular = value.popular;
				},
				error: (err) => console.log(err.message),
			});
	}

	ngOnDestroy(): void {
		this.completer$.next();
		this.completer$.complete();
	}
}
