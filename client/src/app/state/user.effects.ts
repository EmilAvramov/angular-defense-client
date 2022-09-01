import { initialUserState } from './user.state';
import * as userActions from './user.actions';
import { UserActionsNames } from './user.actions';
import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BooksEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly http: HttpClient
	) {}

    
}
