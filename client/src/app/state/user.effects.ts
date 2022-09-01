import * as userActions from './user.actions';
import { UserActionsNames } from './user.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
	asyncScheduler,
	catchError,
	map,
	Observable,
	scheduled,
	switchMap,
	of,
} from 'rxjs';
import { AuthService } from './user.service';
import { User } from './user.models';

@Injectable()
export class BooksEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly authService: AuthService
	) {}

	public readonly loginUser$: Observable<any> = createEffect(() => {
		return this.actions$.pipe(
			ofType(UserActionsNames.UserLogin),
			switchMap(({ email, password }) =>
				scheduled(this.authService.loginUser(email, password), asyncScheduler)
			),
			map((data: User) => userActions.UserLoginSuccess({ data })),
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
			map((data: User) => userActions.UserRegisterSuccess({ data })),
			catchError((error: string | null) =>
				of(userActions.UserRegisterFailure({ error }))
			)
		);
	});
}
