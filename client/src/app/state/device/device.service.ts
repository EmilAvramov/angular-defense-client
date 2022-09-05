import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { server } from 'src/app/shared/variables/config';

@Injectable()
export class DeviceService {
	private headers = { 'content-type': 'application/json' };
	private request = new Subject();

	constructor(private http: HttpClient) {}

	getDevices(limit: number, offset: number): Observable<any> {
		this.http
			.post(
				`${server}/device/list`,
				{ limit, offset },
				{
					headers: this.headers,
				}
			)
			.subscribe((res) => this.request.next(res));
		return this.request;
	}

	searchDevices(query: string, limit: number, offset: number): Observable<any> {
		this.http
			.post(
				`${server}/device/list/search/?query=${query}`,
				{ limit, offset },
				{
					headers: this.headers,
				}
			)
			.subscribe((res) => this.request.next(res));
		return this.request;
	}
}
