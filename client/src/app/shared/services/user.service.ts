import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { server } from '../variables/config';

@Injectable()
export class DataService {
	public headers = { 'content-type': 'application/json', responseType: 'json' };
	public request = new Subject();

	constructor(private http: HttpClient) {}

	loginUser(email: string, password: string): Observable<any> {
		this.http
			.post(
				`${server}/users/login`,
				{ email, password },
				{ headers: this.headers }
			)
			.subscribe((res) => this.request.next(res));
		return this.request;
	}

	registerUser(
		email: string,
		password: string,
		firstName: string,
		lastName: string,
		phone: string,
		address: string,
		city: string
	) {
		this.http
			.post(
				`${server}/users/register`,
				{
					email,
					password,
					firstName,
					lastName,
					phone,
					address,
					city,
				},
				{ headers: this.headers }
			)
			.subscribe((res) => this.request.next(res));
		return this.request;
	}
}
