import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, Observable, switchMap, of } from 'rxjs';

import * as userActions from './user.actions';
import { UserActionsNames } from './user.actions';
import { AuthService, StorageService } from './user.service';
import { UserAuth } from './user.state';

@Injectable()
export class UserEffects {
	public storage: UserAuth | undefined;

	constructor(
		private readonly actions$: Actions,
		private readonly authService: AuthService,
		private readonly storageService: StorageService
	) {
		this.storage = this.storageService.getStorage();
	}

	public readonly checkUser$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActionsNames.UserInit),
			map(() =>
				this.storage
					? userActions.UserInitSuccess({ user: this.storage })
					: userActions.UserInitFailure({ user: undefined })
			)
		)
	);

	public readonly loginUser$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActionsNames.UserLogin),
			map(({ email, password }) => userActions.UserLogin({ email, password })),
			switchMap(({ email, password }) =>
				this.authService.loginUser(email, password).pipe(
					map((user: UserAuth) => {
						this.storageService.setStorage(user);
						return userActions.UserLoginSuccess({ user });
					})
				)
			),
			catchError((error: string | null) =>
				of(userActions.UserLoginFailure({ error }))
			)
		)
	);

	public readonly registerUsers$: Observable<any> = createEffect(() => {
		return this.actions$.pipe(
			ofType(UserActionsNames.UserRegister),
			map(({ email, password, firstName, lastName, phone, address, city }) =>
				userActions.UserRegister({
					email,
					password,
					firstName,
					lastName,
					phone,
					address,
					city,
				})
			),
			switchMap(({ email, password, firstName, lastName, phone, address, city }) =>
				this.authService
					.registerUser(email, password, firstName, lastName, phone, address, city)
					.pipe(
						map((user: UserAuth) => {
							this.storageService.setStorage(user);
							return userActions.UserRegisterSuccess({ user });
						})
					)
			),
			catchError((error: string | null) =>
				of(userActions.UserRegisterFailure({ error }))
			)
		);
	});

	public readonly logoutUser$: Observable<any> = createEffect(() => {
		return this.actions$.pipe(
			ofType(UserActionsNames.UserLogout),
			map(({ token }) => userActions.UserLogout({ token })),
			switchMap(({ token }) =>
				this.authService.logoutUser(token).pipe(
					map((res) => {
						this.storageService.clearStorage();
						return userActions.UserLogoutSuccess({ message: res.message });
					})
				)
			),
			catchError((error: string | null) =>
				of(userActions.UserLogoutFailure({ error }))
			)
		);
	});
}
