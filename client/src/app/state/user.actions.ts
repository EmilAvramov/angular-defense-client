import { createAction, props } from '@ngrx/store';
import { User } from './user.models';

export enum UserActionsNames {
	UserInit = '[User] Init',
	GetUserInformation = '[User] Get User Information',
	UserLoginSuccess = '[User] Login User Success',
	UserLoginFailure = '[User] Login User Failure',
	UserRegisterSuccess = '[User] Register User Success',
	UserRegisterFailure = '[User] Register User Failure',
	ClearUserSuccess = '[User] Clear User Success',
	ClearUserFailure = '[User] Clear User Failure',
}

export const UserInit = createAction(UserActionsNames.UserInit);

export const GetUserInformation = createAction(
	UserActionsNames.GetUserInformation,
	props<{ data: User }>
);

export const UserLoginSuccess = createAction(
	UserActionsNames.UserLoginSuccess,
	props<{ data: User }>
);

export const UserLoginFailure = createAction(
	UserActionsNames.UserLoginFailure,
	props<{ error: string | null }>
);

export const UserRegisterSuccess = createAction(
	UserActionsNames.UserRegisterSuccess,
	props<{ data: User }>
);

export const UserRegisterFailure = createAction(
	UserActionsNames.UserRegisterFailure,
	props<{ error: string | null }>
);

export const ClearUserSuccess = createAction(
	UserActionsNames.ClearUserSuccess,
	props<{ data: '' }>
);

export const ClearUserFailure = createAction(
	UserActionsNames.ClearUserFailure,
	props<{ error: string | null }>
);
