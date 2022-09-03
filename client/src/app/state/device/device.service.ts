import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { server } from 'src/app/shared/variables/config';

@Injectable()
export class DataService {
	public headers = { 'content-type': 'application/json' };
	public request = new Subject();

	constructor(private http: HttpClient) {}

	requestDevices(limit: number, offset: number): Subject<any> {
		this.http
			.post(
				`${server}/device/listData`,
				{ limit: limit, offset: offset },
				{
					headers: this.headers,
				}
			)
			.subscribe((res) => this.request.next(res));
		return this.request;
	}

	queryDevices(query: string, limit: number, offset: number): Subject<any> {
		this.http
			.post(
				`${server}/device/listData/search/?query=${query}`,
				{ limit: limit, offset: offset },
				{
					headers: this.headers,
				}
			)
			.subscribe((res) => this.request.next(res));
		return this.request;
	}
}
