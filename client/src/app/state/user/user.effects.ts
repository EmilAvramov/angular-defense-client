import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, Observable, switchMap, of, tap } from 'rxjs';

import * as userActions from './user.actions';
import { UserActionsNames } from './user.actions';
import { AuthService, StorageService } from './user.service';
import { Error, User } from './user.state';

@Injectable()
export class UserEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly authService: AuthService,
		private readonly storageService: StorageService
	) {}

	public readonly checkUser$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActionsNames.UserInit),
			map(() => this.storageService.getStorage()),
			switchMap(
				async ({ id, email, firstName, lastName, phone, address, city, token }) =>
					userActions.UserInitSuccess({
						id,
						email,
						firstName,
						lastName,
						phone,
						address,
						city,
						token,
					})
			),
			catchError(() => of(userActions.UserInitFailure({ user: undefined })))
		)
	);

	public readonly loginUser$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActionsNames.UserLogin),
			map(({ email, password }) => userActions.UserLogin({ email, password })),
			switchMap(({ email, password }) =>
				this.authService.loginUser(email, password).pipe(
					map((user: User) => {
						this.storageService.setStorage(user);
						return userActions.UserLoginSuccess({ user });
					}),
					catchError((error: Error) => {
						const message = error?.error.message;
						return of(userActions.UserLoginFailure({ message }));
					})
				)
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
						map((user: User) => {
							this.storageService.setStorage(user);
							return userActions.UserRegisterSuccess({ user });
						}),
						catchError((error: Error) => {
							const message = error?.error.message;
							return of(userActions.UserRegisterFailure({ message }));
						})
					)
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
					}),
					catchError((error: Error) => {
						const message = error?.error.message;
						return of(userActions.UserLogoutFailure({ message }));
					})
				)
			)
		);
	});

	public readonly validateUser$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActionsNames.UserValidate),
			map(({ token }) => userActions.UserValidate({ token })),
			switchMap(({ token }) =>
				this.authService.validateUser(token).pipe(
					map((user: User) => userActions.UserValidateSuccess({ user })),
					catchError((error: Error) => {
						const message = error?.error.message;
						return of(userActions.UserValidateFailure({ message }));
					})
				)
			)
		)
	);

	public readonly changeDetails$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActionsNames.UserChangeDetails),
			map(({ id, email, firstName, lastName, phone, address, city, token }) =>
				userActions.UserChangeDetails({
					id,
					email,
					firstName,
					lastName,
					phone,
					address,
					city,
					token,
				})
			),
			switchMap(
				({ id, email, firstName, lastName, phone, address, city, token }) =>
					this.authService
						.changeDetails(
							id,
							email,
							firstName,
							lastName,
							phone,
							address,
							city,
							token
						)
						.pipe(
							map((user: User) => {
								this.storageService.setStorage(user);
								return userActions.UserChangeDetailsSuccess({ data: user });
							}),
							catchError((error: Error) => {
								const message = error?.error.message;
								return of(userActions.UserChangeDetailsFailure({ message }));
							})
						)
			)
		)
	);

	public readonly changePassword$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActionsNames.UserChangePassword),
			map(({ id, password, token }) =>
				userActions.UserChangePassword({ id, password, token })
			),
			switchMap(({ id, password, token }) =>
				this.authService.changePassword(id, password, token).pipe(
					map((user: User) => {
						this.storageService.setStorage(user);
						return userActions.UserChangePasswordSuccess({ data: user });
					}),
					catchError((error: Error) => {
						const message = error?.error.message;
						return of(userActions.UserChangePasswordFailure({ message }));
					})
				)
			)
		)
	);

	public readonly deleteAccount$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActionsNames.UserDeleteAccount),
			map(({ id, token }) => userActions.UserDeleteAccount({ id, token })),
			switchMap(({ id, token }) =>
				this.authService.deleteAccount(id, token).pipe(
					map((message: string) =>
						userActions.UserDeleteAccountSuccess({ message })
					),
					tap(() => this.storageService.clearStorage()),
					catchError((error: Error) => {
						const message = error?.error.message;
						return of(userActions.userDeleteAccountFailure({ message }));
					})
				)
			)
		)
	);
}
