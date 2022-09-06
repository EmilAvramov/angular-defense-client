import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { server } from 'src/app/shared/variables/config';
import { Device } from '../device/device.state';
import { Posting, PostingPayload } from './posting.state';

@Injectable()
export class PostingService {
	public headers = { 'content-type': 'application/json' };

	constructor(private http: HttpClient) {}

	getPostings(limit: number, offset: number): Observable<Posting[]> {
		return this.http.post<Posting[]>(
			`${server}/postings/list`,
			{ limit, offset },
			{
				headers: this.headers,
			}
		);
	}

	searchPostings(
		query: string,
		limit: number,
		offset: number
	): Observable<Posting[]> {
		return this.http.post<Posting[]>(
			`${server}/postings/list/search/?query=${query}`,
			{ limit, offset },
			{ headers: this.headers }
		);
	}

	createPosting(payload: PostingPayload): Observable<Posting> {
		return this.http.post<Posting>(
			`${server}/postings/create`,
			{ payload },
			{ headers: this.headers }
		);
	}

	editPosting(
		id: number,
		comments: string | null,
		price: number | null
	): Observable<Posting> {
		return this.http.post<Posting>(
			`${server}/postings/edit/${id}`,
			{ comments, price },
			{ headers: this.headers }
		);
	}

	deletePosting(id: number): Observable<any> {
		return this.http.post(`${server}/postings/delete/${id}`, {
			headers: this.headers,
		});
	}

	searchDevices(query: string, limit: number): Observable<Device[]> {
		return this.http.post<Device[]>(
			`${server}/device/list/search/?query=${query}`,
			{ limit },
			{
				headers: this.headers,
			}
		);
	}
}
