import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { server } from 'src/app/shared/variables/config';
import { PostingPayload } from './posting.state';

@Injectable()
export class PostingService {
	public headers = { 'content-type': 'application/json' };
	public request = new Subject();

	constructor(private http: HttpClient) {}

	getPostings(limit: number, offset: number): Subject<any> {
		this.http
			.post(
				`${server}/postings/list`,
				{ limit, offset },
				{
					headers: this.headers,
				}
			)
			.subscribe((res) => this.request.next(res));
		return this.request;
	}

	searchPostings(query: string, limit: number, offset: number): Subject<any> {
		this.http
			.post(
				`${server}/postings/list/search/?query=${query}`,
				{ limit, offset },
				{ headers: this.headers }
			)
			.subscribe((res) => this.request.next(res));
		return this.request;
	}

	createPosting(payload: PostingPayload): Subject<any> {
		this.http
			.post(`${server}/postings/create`, { payload }, { headers: this.headers })
			.subscribe((res) => this.request.next(res));
		return this.request;
	}

	editPosting(
		id: number,
		comments: string | null,
		price: number | null
	): Subject<any> {
		this.http
			.post(
				`${server}/postings/edit/${id}`,
				{ comments, price },
				{ headers: this.headers }
			)
			.subscribe((res) => this.request.next(res));
		return this.request;
	}

	deletePosting(id: number): Subject<any> {
		this.http
			.post(`${server}/postings/delete/${id}`, { headers: this.headers })
			.subscribe((res) => this.request.next(res));
		return this.request;
	}
}
