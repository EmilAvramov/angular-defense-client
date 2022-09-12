import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { server } from '../../shared/variables/config';
import { User } from './user.state';

@Injectable()
export class AuthService {
	public headers = { 'content-type': 'application/json' };
	public request = new Subject();

	constructor(private http: HttpClient) {}

	loginUser(email: string, password: string): Observable<User> {
		return this.http.post<User>(
			`${server}/users/login`,
			{ email, password },
			{ headers: this.headers }
		);
	}

	registerUser(
		email: string,
		password: string,
		firstName: string,
		lastName: string,
		phone: string,
		address: string,
		city: string
	): Observable<User> {
		return this.http.post<User>(
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
		);
	}

	logoutUser(token: string): Observable<any> {
		return this.http.post(
			`${server}/users/logout`,
			{ token },
			{
				headers: {
					'content-type': 'application/json',
					'x-authorization': token as string,
				},
			}
		);
	}

	validateUser(token: string): Observable<User> {
		return this.http.post<User>(
			`${server}/users/validate`,
			{ token },
			{ headers: this.headers }
		);
	}

	changeDetails(
		id: number,
		email: string,
		firstName: string,
		lastName: string,
		phone: string,
		address: string,
		city: string,
		token: string
	): Observable<User> {
		return this.http.patch<User>(
			`${server}/users/edit/details/${id}`,
			{ email, firstName, lastName, phone, address, city },
			{ headers: { 'content-type': 'application/json', 'X-Authorization': token } }
		);
	}

	changePassword(id: number, password: string, token: string): Observable<User> {
		return this.http.patch<User>(
			`${server}/users/edit/password/${id}`,
			{ password },
			{ headers: { 'content-type': 'application/json', 'X-Authorization': token } }
		);
	}

	deleteAccount(id: number, token: string): Observable<any> {
		return this.http.delete<User>(`${server}/users/delete/${id}`, {
			headers: { 'content-type': 'application/json', 'X-Authorization': token },
		});
	}
}

@Injectable()
export class StorageService {
	setStorage(response: User): void {
		sessionStorage.setItem('id', response.id!.toString());
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

	getStorage(): User {
		return {
			id: Number(sessionStorage.getItem('id'))!,
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
