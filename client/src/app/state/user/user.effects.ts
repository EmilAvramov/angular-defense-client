import * as userActions from './user.actions';
import { UserActionsNames } from './user.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, Observable, switchMap, of } from 'rxjs';
import { AuthService, StorageService } from './user.service';
import { UserState, StorageState, UserAuth, UserSession } from './user.models';

@Injectable()
export class UserEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly authService: AuthService,
		private readonly storageService: StorageService
	) {}

	public readonly loginUser$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActionsNames.UserLogin),
			map(({ email, password }) => userActions.UserLogin({ email, password })),
			switchMap(({ email, password }) =>
				this.authService.loginUser(email, password).pipe(
					map((data: UserAuth) => {
						this.storageService.setStorage(data);
						let user: UserSession = {
							email: data.payload.email,
							firstName: data.payload.firstName,
							lastName: data.payload.lastName,
							phone: data.payload.phone,
							address: data.payload.address,
							city: data.payload.city,
							token: data.accessToken,
						};
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
				userActions.RegisterUser({
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
						map((data: UserAuth) => {
							this.storageService.setStorage(data);
							let user: UserSession = {
								email: data.payload.email,
								firstName: data.payload.firstName,
								lastName: data.payload.lastName,
								phone: data.payload.phone,
								address: data.payload.address,
								city: data.payload.city,
								token: data.accessToken,
							};
							return userActions.UserLoginSuccess({ user });
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
			ofType(UserActionsNames.LogoutUser),
			map(({ token }) => userActions.LogoutUser({ token })),
			switchMap(({ token }) =>
				this.authService.logoutUser(token).pipe(
					map((res) => {
						this.storageService.clearStorage();
						return userActions.LogoutUserSuccess({ message: res.message });
					})
				)
			),
			catchError((error: string | null) =>
				of(userActions.LogoutUserFailure({ error }))
			)
		);
	});

	public readonly getUserSession$: Observable<any> = createEffect(() => {
		return this.actions$.pipe(
			ofType(UserActionsNames.AccessUserSession),
			switchMap(() =>
				this.storageService.getStorage().pipe(
					map((data: StorageState) => {
						console.log(data)
						return userActions.AccessUserSessionSuccess({ data });
					})
				)
			),
			catchError((error: string | null) =>
				of(userActions.AccessUserSessionFailure({ error }))
			)
		);
	});
}
