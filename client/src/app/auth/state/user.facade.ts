import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import * as userSelectors from './user.selectors';
import * as userActions from './user.actions';
import { StorageState, UserState } from './user.models';

@Injectable()
export class UserFacade {
	constructor(private readonly store: Store<UserState>) {}

	public readonly userLoaded$: Observable<boolean> = this.store.pipe(
		select(userSelectors.getUserLoaded)
	);

	public readonly userData$: Observable<UserState> = this.store.pipe(
		select(userSelectors.getUserState)
	);

	public readonly storageLoaded$: Observable<boolean> = this.store.pipe(
		select(userSelectors.getStorageLoaded)
	);

	public readonly storageData$: Observable<StorageState> = this.store.pipe(
		select(userSelectors.getStorageState)
	);

	public userInit(): void {
		this.store.dispatch(userActions.UserInit());
	}

	public userLogin(): void {
		this.store.dispatch(userActions.UserLogin());
	}

	public userRegister(): void {
		this.store.dispatch(userActions.RegisterUser());
	}

	public userLogout(): void {
		this.store.dispatch(userActions.LogoutUser());
	}

	public storageInit(): void {
		this.store.dispatch(userActions.SessionStorageInit());
	}

	public accessStorage(): void {
		this.store.dispatch(userActions.AccessUserSession());
	}
}
