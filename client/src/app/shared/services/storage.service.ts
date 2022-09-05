import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User, UserDetails, UserSession } from '../interfaces/User.interface';

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

	setStorage(response: User):Observable<any> {
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

	getToken(): string | null {
		return this.get('token');
	}

	getAllData(): UserDetails {
		return {
			email: this.get('email')!,
			firstName: this.get('firstName')!,
			lastName: this.get('lastName')!,
			phone: this.get('phone')!,
			address: this.get('address')!,
			city: this.get('city')!,
		}
	}
}
