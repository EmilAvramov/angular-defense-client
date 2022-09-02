import { createAction, props } from '@ngrx/store';
import { User, UserSession } from './user.models';

export enum UserActionsNames {
	UserInit = '[User] Init',
	UserLogin = '[User] Login User',
	UserLoginSuccess = '[User] Login User Success',
	UserLoginFailure = '[User] Login User Failure',
	UserRegister = '[User] Register User',
	UserRegisterSuccess = '[User] Register User Success',
	UserRegisterFailure = '[User] Register User Failure',
	LogoutUser = '[User] Clear User',
	LogoutUserSuccess = '[User] Clear User Success',
	LogoutUserFailure = '[User] Clear User Failure',
	AccessUserSession = '[User] Access User Session',
	AccessUserSessionSuccess = '[User] Get Details Success',
	AccessUserSessionFailure = '[User] Get Details Failure',
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

export const LogoutUser = createAction(UserActionsNames.LogoutUser);

export const LogoutUserSuccess = createAction(
	UserActionsNames.LogoutUserSuccess,
	props<{ data: string }>()
);

export const LogoutUserFailure = createAction(
	UserActionsNames.LogoutUserFailure,
	props<{ error: string | null }>()
);

export const AccessUserSession = createAction(UserActionsNames.AccessUserSession);

export const AccessUserSessionSuccess = createAction(
	UserActionsNames.AccessUserSessionSuccess,
	props<{ data: UserSession }>()
);

export const AccessUserSessionFailure = createAction(
	UserActionsNames.AccessUserSessionFailure,
	props<{ error: string | null }>()
);
