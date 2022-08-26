import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { server } from 'src/app/shared/variables/config';
import { Device } from 'src/app/shared/interfaces/Devices.interface';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.sass'],
})
export class ListComponent implements OnInit {
	public limit: number = 200;
	public data: Device[] = [];

	constructor(private http: HttpClient) {}

	ngOnInit(): void {
    this.limit = 200
    this.requestData()
  }

	loadMore(): void {
		this.limit += 200;
    this.requestData()
	}

  requestData(): void {
		const headers = { 'content-type': 'application/json' };

		this.http
			.post(
				`${server}/device/list/`,
				{ limit: this.limit },
				{
					headers: headers,
					responseType: 'json',
				}
			)
			.subscribe({
				next: (value: any) => {
					console.log(value);
					value.forEach((item: Device) => {
						this.data.push(item);
					});
					console.log(this.data);
				},
				error: (err) => console.log(err.message),
			});
	}
}
