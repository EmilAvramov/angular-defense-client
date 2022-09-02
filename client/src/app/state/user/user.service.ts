import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { server } from '../../shared/variables/config';
import { UserAuth, UserSession } from './user.models';

@Injectable()
export class AuthService {
	public headers = { 'content-type': 'application/json' };
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
}

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	private storage = new Subject<string>();
	public session: UserSession | undefined;

	get(arg: string): string | null{
		return sessionStorage.getItem(arg)
	}

	watchStorage(): Observable<any> {
		return this.storage.asObservable();
	}

	setStorage(response: UserAuth):Observable<any> {
		sessionStorage.setItem('email', response.payload.email);
		sessionStorage.setItem('firstName', response.payload.firstName);
		sessionStorage.setItem('lastName', response.payload.lastName);
		sessionStorage.setItem('phone', response.payload.phone);
		sessionStorage.setItem('address', response.payload.address);
		sessionStorage.setItem('city', response.payload.city);
		sessionStorage.setItem('token', response.accessToken);
		return this.storage
	}

	clearStorage(): Observable<any> {
		sessionStorage.clear();
		return this.storage
	}

	getStorage(): Observable<any> {
		this.session = {
			email: this.get('email')!,
			firstName: this.get('firstName')!,
			lastName: this.get('lastName')!,
			phone: this.get('phone')!,
			address: this.get('address')!,
			city: this.get('city')!,
			token: this.get('token')!
		}
		return this.storage
	}
}