import { initialStorageState, initialUserState } from './user.state';
import * as userActions from './user.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { StorageState, UserState } from './user.models';

export const _userReducer = createReducer(
	initialUserState,
	on(userActions.UserInit, (state) => ({
		...state,
		loading: false,
		error: null,
	})),
	on(userActions.UserLogin, (state) => ({
		...state,
		loading: false,
		error: null,
	})),
	on(userActions.UserLoginSuccess, (state) => ({
		...state,
		loading: true,
		error: null,
	})),
	on(userActions.UserLoginFailure, (state, { error }) => ({
		...state,
		error,
	})),
	on(userActions.RegisterUser, (state) => ({
		...state,
		loading: false,
		error: null,
	})),
	on(userActions.UserRegisterSuccess, (state) => ({
		...state,
		loading: true,
		error: null,
	})),
	on(userActions.UserRegisterFailure, (state, { error }) => ({
		...state,
		error,
	})),
	on(userActions.LogoutUser, (state) => ({
		...state,
		loading: false,
		error: null,
	})),
	on(userActions.LogoutUserSuccess, (state) => ({
		...state,
		loading: false,
		error: null,
	})),
	on(userActions.LogoutUserFailure, (state, { error }) => ({
		...state,
		error,
	}))
);

const _storageReducer = createReducer(
	initialStorageState,
	on(userActions.SessionStorageInit, (state) => ({
		...state,
		loading: false,
		error: null,
	})),
	on(userActions.AccessUserSession, (state) => ({
		...state,
		loading: false,
		error: null,
	})),
	on(userActions.AccessUserSessionSuccess, (state) => ({
		...state,
		loading: true,
		error: null,
	})),
	on(userActions.AccessUserSessionFailure, (state, { error }) => ({
		...state,
		error,
	}))
);

export function userReducer(state: UserState | undefined, action: Action) {
	return _userReducer(state, action);
}

export function storageReducer(
	state: StorageState | undefined,
	action: Action
) {
	return _storageReducer(state, action);
}
