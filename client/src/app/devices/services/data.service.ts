import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from 'src/app/shared/interfaces/Devices.interface';
import { server } from 'src/app/shared/variables/config';

@Injectable()
export class DataService {
	public headers = { 'content-type': 'application/json' };

	constructor(private http: HttpClient) {}

	requestData(data: Device[], limit: number, offset: number): void {
		this.http
			.post(
				`${server}/device/list/`,
				{ limit: limit, offset: offset },
				{
					headers: this.headers,
					responseType: 'json',
				}
			)
			.subscribe({
				next: (value: any) => {
					value.forEach((item: Device) => {
						data.push(item);
					});
				},
				error: (err) => console.log(err.message),
			});
	}

	queryData(data: Device[], query: string): void {
		this.http
			.post(`${server}/device/list/search/?query=${query}`, {
				headers: this.headers,
				responseType: 'json',
			})
			.subscribe({
				next: (value: any) => {
					value.forEach((item: Device) => {
						data.push(item);
					});
				},
				error: (err) => console.log(err.message),
			});
	}
}
