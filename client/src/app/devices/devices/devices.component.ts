import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/shared/interfaces/Devices.interface';
import { server } from 'src/app/shared/variables/config';

@Component({
	selector: 'devices-page',
	templateUrl: './devices.component.html',
	styleUrls: ['./devices.component.sass'],
})
export class DevicesComponent implements OnInit {
	public limit: number = 100;
	public offset: number = 0;
	public data: Device[] = [];

	constructor(private http: HttpClient) {}

	ngOnInit(): void {
		this.limit = 100;
		this.offset = 0;
		this.requestData();
	}

	loadMore(): void {
		this.limit += 100;
		this.offset += 100;
		this.requestData();
	}

	requestData(): void {
		const headers = { 'content-type': 'application/json' };

		this.http
			.post(
				`${server}/device/list/`,
				{ limit: this.limit, offset: this.offset },
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
