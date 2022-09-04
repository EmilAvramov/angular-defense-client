import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DevicePostingPayload } from 'src/app/shared/interfaces/Posting.interface';
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
			})
			.subscribe((res) => this.request.next(res));
		return this.request;
	}

	createPosting(payload: DevicePostingPayload): Subject<any> {
		this.http
			.post(
				`${server}/postings/create`,
				{ body: payload },
				{
					headers: this.headers,
				}
			)
			.subscribe((res) => this.request.next(res));
		return this.request;
	}
}
