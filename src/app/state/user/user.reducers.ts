import { Action, createReducer, on } from '@ngrx/store';

import { initialUserState, UserState } from './user.state';
import * as userActions from './user.actions';

export const _userReducer = createReducer(
	initialUserState,
	on(userActions.UserInit, (state) => ({
		...state,
		loaded: false,
		error: null,
	})),
	on(
		userActions.UserInitSuccess,
		(state, { id, email, firstName, lastName, phone, address, city, token }) => ({
			...state,
			id,
			email,
			firstName,
			lastName,
			phone,
			address,
			city,
			token,
			loaded: true,
			error: null,
		})
	),
	on(userActions.UserInitFailure, (state) => ({
		...state,
		id: 0,
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
	on(userActions.UserLogin, (state) => ({
		...state,
		loaded: false,
		error: null,
	})),
	on(userActions.UserLoginSuccess, (state, { user }) => ({
		...state,
		id: user.id,
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
	on(userActions.UserLoginFailure, (state, { message }) => ({
		...state,
		loaded: false,
		error: message,
	})),
	on(userActions.UserRegister, (state) => ({
		...state,
		loaded: false,
		error: null,
	})),
	on(userActions.UserRegisterSuccess, (state, { user }) => ({
		...state,
		id: user.id,
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
	on(userActions.UserRegisterFailure, (state, { message }) => ({
		...state,
		id: 0,
		email: '',
		firstName: '',
		lastName: '',
		phone: '',
		address: '',
		city: '',
		token: '',
		loaded: false,
		error: message,
	})),
	on(userActions.UserLogout, (state) => ({
		...state,
		loaded: true,
		error: null,
	})),
	on(userActions.UserLogoutSuccess, (state) => ({
		...state,
		id: 0,
		email: '',
		firstName: '',
		lastName: '',
		phone: '',
		address: '',
		city: '',
		token: '',
		validated: null,
		loaded: false,
		error: null,
	})),
	on(userActions.UserLogoutFailure, (state, { message }) => ({
		...state,
		error: message,
	})),
	on(userActions.UserValidate, (state) => ({
		...state,
		loaded: false,
		error: null,
	})),
	on(userActions.UserValidateSuccess, (state, { user }) => ({
		...state,
		validated: user,
		loaded: true,
		error: null,
	})),
	on(userActions.UserValidateFailure, (state, { message }) => ({
		...state,
		validated: null,
		loaded: false,
		error: message,
	})),
	on(userActions.UserChangeDetails, (state) => ({
		...state,
		loaded: false,
		error: null,
	})),
	on(userActions.UserChangeDetailsSuccess, (state, { data }) => ({
		...state,
		email: data.email,
		firstName: data.firstName,
		lastName: data.lastName,
		phone: data.phone,
		address: data.address,
		city: data.city,
		loaded: true,
		error: null,
	})),
	on(userActions.UserChangeDetailsFailure, (state, { message }) => ({
		...state,
		loaded: false,
		error: message,
	})),
	on(userActions.UserChangePassword, (state) => ({
		...state,
		loaded: false,
		error: null,
	})),
	on(userActions.UserChangeDetailsSuccess, (state) => ({
		...state,
		loaded: true,
		error: null,
	})),
	on(userActions.UserChangePasswordFailure, (state, { message }) => ({
		...state,
		loaded: false,
		error: message,
	})),
	on(userActions.UserDeleteAccount, (state) => ({
		...state,
		loaded: false,
		error: null,
	})),
	on(userActions.UserDeleteAccountSuccess, (state) => ({
		...state,
		id: 0,
		email: '',
		firstName: '',
		lastName: '',
		phone: '',
		address: '',
		city: '',
		token: '',
		loaded: true,
		error: null,
	})),
	on(userActions.userDeleteAccountFailure, (state, { message }) => ({
		...state,
		loaded: false,
		error: message,
	}))
);

export function userReducer(state: UserState | undefined, action: Action) {
	return _userReducer(state, action);
}
