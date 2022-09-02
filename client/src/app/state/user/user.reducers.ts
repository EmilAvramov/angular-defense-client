import { initialUserState, UserState } from './user.state';
import * as userActions from './user.actions';
import { Action, createReducer, on } from '@ngrx/store';

export const _userReducer = createReducer(
	initialUserState,
	on(userActions.UserInit, (state) => ({
		...state,
		loaded: false,
		error: null,
	})),
	on(userActions.UserInitSuccess, (state, { user }) => ({
		...state,
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		phone: user.phone,
		address: user.address,
		city: user.address,
		token: user.token,
		loaded: true,
		error: null,
	})),
	on(userActions.UserInitFailure, (state) => ({
		...state,
		loaded: false,
		error: null,
	})),
	on(userActions.UserLogin, (state) => ({
		...state,
		loaded: false,
		error: null,
	})),
	on(userActions.UserLoginSuccess, (state, { user }) => ({
		...state,
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		phone: user.phone,
		address: user.address,
		city: user.address,
		token: user.token,
		loaded: true,
		error: null,
	})),
	on(userActions.UserLoginFailure, (state, { error }) => ({
		...state,
		error,
	})),
	on(userActions.UserRegister, (state) => ({
		...state,
		loaded: false,
		error: null,
	})),
	on(userActions.UserRegisterSuccess, (state, { user }) => ({
		...state,
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		phone: user.phone,
		address: user.address,
		city: user.address,
		token: user.token,
		loaded: true,
		error: null,
	})),
	on(userActions.UserRegisterFailure, (state, { error }) => ({
		...state,
		error,
	})),
	on(userActions.UserLogout, (state) => ({
		...state,
		loaded: true,
		error: null,
	})),
	on(userActions.UserLogoutSuccess, (state) => ({
		...state,
		email: '',
		firstName: '',
		lastName: '',
		phone: '',
		address: '',
		city: '',
		token: '',
		loaded: false,
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
