import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { server } from 'src/app/shared/variables/config';

@Injectable()
export class DataService {
	public headers = { 'content-type': 'application/json' };
	public request = new Subject();

	constructor(private http: HttpClient) {}

	getPostingData(query: string = ''): Subject<any> {
		if (query) {
			this.http
				.post(`${server}/postings/list/search/?query=${query}`, {
					headers: this.headers,
					responseType: 'json',
				})
				.subscribe((res) => this.request.next(res));
			return this.request;
		}
		this.http
			.get(`${server}/postings/list`)
			.subscribe((res) => this.request.next(res));
		return this.request;
	}

	getDeviceDetails(query: string): Subject<any> {
		this.http
			.post(`${server}/device/listData/search/?query=${query}`, {
				headers: this.headers,
				responseType: 'json',
			})
			.subscribe((res) => this.request.next(res));
		return this.request;
	}

	requestData(limit: number, offset: number): Subject<any> {
		this.http
			.post(
				`${server}/device/list/`,
				{ limit: limit, offset: offset },
				{
					headers: this.headers,
					responseType: 'json',
				}
			)
			.subscribe((res) => this.request.next(res));
		return this.request;
	}
}
