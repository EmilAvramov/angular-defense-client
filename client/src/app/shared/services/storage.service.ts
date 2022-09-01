import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserAuth, UserDetails } from '../interfaces/User.interface';

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	private storage = new Subject<string>();

	watchStorage(): Observable<any> {
		return this.storage.asObservable();
	}

	setStorage(response: UserAuth) {
		sessionStorage.setItem('email', response.payload.email);
		sessionStorage.setItem('firstName', response.payload.firstName);
		sessionStorage.setItem('lastName', response.payload.lastName);
		sessionStorage.setItem('phone', response.payload.phone);
		sessionStorage.setItem('address', response.payload.address);
		sessionStorage.setItem('city', response.payload.city);
		sessionStorage.setItem('token', response.accessToken);
		this.storage.next('added');
	}

	get(arg: string): string | null{
		return sessionStorage.getItem(arg)
	}

	clearStorage(): void {
		sessionStorage.clear();
		this.storage.next('cleared');
	}

	getToken(): string | null {
		return this.get('token');
	}

	getAllData(): UserDetails {
		const user = {
			email: this.get('email')!,
			firstName: this.get('firstName')!,
			lastName: this.get('lastName')!,
			phone: this.get('phone')!,
			address: this.get('address')!,
			city: this.get('city')!,
		}
		return user
	}
}
