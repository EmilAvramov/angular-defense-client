import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserAuth } from '../interfaces/User.interface';

@Injectable()
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
        this.storage.next('added')
	}

    getToken() : string | null {
        return sessionStorage.getItem('token')
    }

    clearStorage(): void{
        sessionStorage.clear()
        this.storage.next('cleared')
    }
}
