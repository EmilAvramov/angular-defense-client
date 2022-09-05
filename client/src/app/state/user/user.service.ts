import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { server } from '../../shared/variables/config';
import { UserAuth } from './user.state';

@Injectable()
export class AuthService {
	public headers = { 'content-type': 'application/json' };
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
	): Observable<any> {
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

	logoutUser(token: string): Observable<any> {
		this.http
			.post(
				`${server}/users/logout`,
				{ token },
				{
					headers: {
						'content-type': 'application/json',
						'x-authorization': token as string,
					},
				}
			)
			.subscribe((res) => this.request.next(res));
		return this.request;
	}

	validateUser(token: string): Observable<any> {
		this.http
			.post(`${server}/users/validate`, { token }, { headers: this.headers })
			.subscribe((res) => this.request.next(res));
		return this.request;
	}
}

@Injectable()
export class StorageService {
	setStorage(response: UserAuth): void {
		sessionStorage.setItem('email', response.email);
		sessionStorage.setItem('firstName', response.firstName);
		sessionStorage.setItem('lastName', response.lastName);
		sessionStorage.setItem('phone', response.phone);
		sessionStorage.setItem('address', response.address);
		sessionStorage.setItem('city', response.city);
		sessionStorage.setItem('token', response.token);
	}

	clearStorage(): void {
		sessionStorage.clear();
	}

	getStorage(): UserAuth {
		return {
			email: sessionStorage.getItem('email')!,
			firstName: sessionStorage.getItem('firstName')!,
			lastName: sessionStorage.getItem('lastName')!,
			phone: sessionStorage.getItem('phone')!,
			address: sessionStorage.getItem('address')!,
			city: sessionStorage.getItem('city')!,
			token: sessionStorage.getItem('token')!,
		};
	}
}
