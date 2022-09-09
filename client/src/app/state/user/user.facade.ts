import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import * as userSelectors from './user.selectors';
import * as userActions from './user.actions';
import { User, UserState } from './user.state';

@Injectable()
export class UserFacade {
	constructor(private readonly store: Store<UserState>) {}

	public readonly userData$: Observable<User> = this.store.pipe(
		select(userSelectors.getUser)
	);

	public readonly userToken$: Observable<string> = this.store.pipe(
		select(userSelectors.getUserToken)
	);

	public readonly userId$: Observable<number | null> = this.store.pipe(
		select(userSelectors.getUserId)
	);

	public readonly userValidated$: Observable<User | null> = this.store.pipe(
		select(userSelectors.getValidatedUser)
	);

	public readonly userLoaded$: Observable<boolean> = this.store.pipe(
		select(userSelectors.getUserLoaded)
	);

	public readonly userError$: Observable<any> = this.store.pipe(
		select(userSelectors.getUserError)
	);

	public initUser(): void {
		this.store.dispatch(userActions.UserInit());
	}

	public loginUser(email: string, password: string): void {
		this.store.dispatch(userActions.UserLogin({ email, password }));
	}

	public registerUser(
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

	public logoutUser(token: string): void {
		this.store.dispatch(userActions.UserLogout({ token }));
	}

	public validateUser(token: string | undefined): any {
		if (token) {
			this.store.dispatch(userActions.UserValidate({ token }));
		}
	}
}
