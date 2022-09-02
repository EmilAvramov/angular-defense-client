import { initialUserState, UserState } from './user.state';
import * as userActions from './user.actions';
import { Action, createReducer, on } from '@ngrx/store';

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
	on(userActions.UserRegister, (state) => ({
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
	on(userActions.UserLogout, (state) => ({
		...state,
		loading: false,
		error: null,
	})),
	on(userActions.UserLogoutSuccess, (state) => ({
		...state,
		loading: false,
		error: null,
	})),
	on(userActions.UserLogoutFailure, (state, { error }) => ({
		...state,
		error,
	}))
);

export function userReducer(state: UserState | undefined, action: Action) {
	return _userReducer(state, action);
}