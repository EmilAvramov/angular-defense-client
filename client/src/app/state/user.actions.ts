import { createAction, props } from '@ngrx/store';
import { User } from './user.models';

export enum UserActionsNames {
	UserInit = '[User] Init',
	UserLogin = '[User] Login User',
	UserLoginSuccess = '[User] Login User Success',
	UserLoginFailure = '[User] Login User Failure',
	UserRegister = '[User] Register User',
	UserRegisterSuccess = '[User] Register User Success',
	UserRegisterFailure = '[User] Register User Failure',
	ClearUser = '[User] Clear User',
	ClearUserSuccess = '[User] Clear User Success',
	ClearUserFailure = '[User] Clear User Failure',
	GetUserDetails = '[User] Get Details',
	GetUserDetailsSuccess = '[User] Get Details Success',
	GetUserDetailsFailure = '[User] Get Details Failure',
	GetUserToken = '[User] Get Token',
	GetUserTokenSuccess = '[User] Get Token Success',
	GetUserTokenFailure = '[User] Get Token Failure'
}

export const UserInit = createAction(UserActionsNames.UserInit);

export const UserLogin = createAction(UserActionsNames.UserLogin);

export const UserLoginSuccess = createAction(
	UserActionsNames.UserLoginSuccess,
	props<{ data: User }>()
);

export const UserLoginFailure = createAction(
	UserActionsNames.UserLoginFailure,
	props<{ error: string | null }>()
);

export const RegisterUser = createAction(UserActionsNames.UserRegister);

export const UserRegisterSuccess = createAction(
	UserActionsNames.UserRegisterSuccess,
	props<{ data: User }>()
);

export const UserRegisterFailure = createAction(
	UserActionsNames.UserRegisterFailure,
	props<{ error: string | null }>()
);

export const ClearUser = createAction(UserActionsNames.ClearUser);

export const ClearUserSuccess = createAction(
	UserActionsNames.ClearUserSuccess,
	props<{ data: '' }>()
);

export const ClearUserFailure = createAction(
	UserActionsNames.ClearUserFailure,
	props<{ error: string | null }>()
);
