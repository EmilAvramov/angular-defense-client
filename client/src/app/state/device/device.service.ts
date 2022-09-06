import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { server } from 'src/app/shared/variables/config';
import { Device } from './device.state';

@Injectable()
export class DeviceService {
	private headers = { 'content-type': 'application/json' };

	constructor(private http: HttpClient) {}

	getDevices(limit: number, offset: number): Observable<Device[]> {
		return this.http.post<Device[]>(
			`${server}/device/list`,
			{ limit, offset },
			{
				headers: this.headers,
			}
		);
	}

	searchDevices(
		query: string,
		limit: number,
		offset: number
	): Observable<Device[]> {
		return this.http.post<Device[]>(
			`${server}/device/list/search/?query=${query}`,
			{ limit, offset },
			{
				headers: this.headers,
			}
		);
	}
}
