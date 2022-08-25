import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HomeRequest, LatestDevice, PopularDevice } from 'src/app/shared/interfaces/Home.interface';
import { server } from 'src/app/shared/variables/config';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {

	latest: LatestDevice[] | undefined
	popular: PopularDevice[] | undefined

	constructor(private http: HttpClient) {
	}

	ngOnInit(): void {
		this.http.get<HomeRequest>(`${server}/data/recommended`).subscribe({
			next: (value) => {
				this.latest = value.latest
				this.popular = value.popular
			},
			error: (err) => console.log(err.message),
		});
	}
}
