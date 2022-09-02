import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { StorageService } from '../shared/services/storage.service';
import { server } from '../shared/variables/config';

@Injectable()
export class AuthService {
	public headers = { 'content-type': 'application/json', responseType: 'json' };
	public request = new Subject();

	constructor(private http: HttpClient, public storageService: StorageService) {}

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

	accessUserSession(): Observable<any> {
		this.storageService.watchStorage().subscribe((res) => this.request.next(res));
		return this.request;
	}
}
