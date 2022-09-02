import * as userActions from './user.actions';
import { UserActionsNames } from './user.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import {
	asyncScheduler,
	catchError,
	map,
	Observable,
	scheduled,
	switchMap,
	of,
} from 'rxjs';
import { AuthService, StorageService } from './user.service';
import { UserState, StorageState } from './user.models';

@Injectable()
export class BooksEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly authService: AuthService,
		private readonly storageService: StorageService
	) {}

	public readonly loginUser$: Observable<any> = createEffect(() => {
		return this.actions$.pipe(
			ofType(UserActionsNames.UserLogin),
			switchMap(({ email, password }) =>
				this.authService
					.loginUser(email, password)
					.pipe(map((data: UserState) => userActions.UserLoginSuccess({ data })))
			),
			catchError((error: string | null) =>
				of(userActions.UserLoginFailure({ error }))
			)
		);
	});

	public readonly registerUsers$: Observable<any> = createEffect(() => {
		return this.actions$.pipe(
			ofType(UserActionsNames.UserRegister),
			switchMap(({ email, password, firstName, lastName, phone, address, city }) =>
				scheduled(
					this.authService.registerUser(
						email,
						password,
						firstName,
						lastName,
						phone,
						address,
						city
					),
					asyncScheduler
				)
			),
			map((data: UserState) => userActions.UserRegisterSuccess({ data })),
			catchError((error: string | null) =>
				of(userActions.UserRegisterFailure({ error }))
			)
		);
	});

	public readonly getUserSession$: Observable<any> = createEffect(() => {
		return this.actions$.pipe(
			ofType(UserActionsNames.AccessUserSession),
			switchMap(() => scheduled(this.storageService.getStorage(), asyncScheduler)),
			map((data: StorageState) => userActions.AccessUserSessionSuccess({ data })),
			catchError((error: string | null) =>
				of(userActions.AccessUserSessionFailure({ error }))
			)
		);
	});

	public readonly logoutUser$: Observable<any> = createEffect(() => {
		return this.actions$.pipe(
			ofType(UserActionsNames.LogoutUser),
			switchMap((token: string) =>
				scheduled(this.authService.logoutUser(token), asyncScheduler)
			),
			switchMap(() =>
				scheduled(this.storageService.clearStorage(), asyncScheduler)
			),
			map((data: string) => userActions.LogoutUserSuccess({ data })),
			catchError((error: string | null) =>
				of(userActions.LogoutUserFailure({ error }))
			)
		);
	});
}
