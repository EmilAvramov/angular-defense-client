import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { server } from 'src/app/shared/variables/config';

@Injectable()
export class DataService {
	private headers = { 'content-type': 'application/json' };
	private request = new Subject();

	constructor(private http: HttpClient) {}

	requestDevices(limit: number, offset: number): Observable<any> {
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

	queryDevices(query: string, limit: number, offset: number): Observable<any> {
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
