import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import * as userSelectors from './user.selectors';
import * as userActions from './user.actions';
import { UserState } from './user.state';

@Injectable()
export class UserFacade {
	constructor(private readonly store: Store<UserState>) {}

	public readonly userData$: Observable<UserState> = this.store.pipe(
		select(userSelectors.getUserState)
	);

	public readonly userLoaded$: Observable<boolean> = this.store.pipe(
		select(userSelectors.getUserLoaded)
	);

	public readonly userError$: Observable<any> = this.store.pipe(
		select(userSelectors.getUserError)
	);

	public userInit(): void {
		this.store.dispatch(userActions.UserInit());
	}

	public userLogin(email: string, password: string): void {
		this.store.dispatch(userActions.UserLogin({ email, password }));
	}

	public userRegister(
		email: string,
		password: string,
		firstName: string,
		lastName: string,
		phone: string,
		address: string,
		city: string
	): void {
		this.store.dispatch(
			userActions.UserRegister({
				email,
				password,
				firstName,
				lastName,
				phone,
				address,
				city,
			})
		);
	}

	public userLogout(token: string): void {
		this.store.dispatch(userActions.UserLogout({ token }));
	}
}
