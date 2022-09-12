import { createAction, props } from '@ngrx/store';
import { User } from './user.state';

export enum UserActionsNames {
	UserInit = '[User] Init',
	UserInitSuccess = '[User] Init Success',
	UserInitFailure = '[User] Init Failure',
	UserLogin = '[User] Login User',
	UserLoginSuccess = '[User] Login User Success',
	UserLoginFailure = '[User] Login User Failure',
	UserRegister = '[User] Register User',
	UserRegisterSuccess = '[User] Register User Success',
	UserRegisterFailure = '[User] Register User Failure',
	UserLogout = '[User] Logout User',
	UserLogoutSuccess = '[User] Logout User Success',
	UserLogoutFailure = '[User] Logout User Failure',
	UserValidate = '[User] Validate',
	UserValidateSuccess = '[User] Validate Success',
	UserValidateFailure = '[User] Validate Failure',
	UserChangeDetails = '[User] Change Details',
	UserChangeDetailsSuccess = '[User] Change Details Success',
	UserChangeDetailsFailure = '[User] Change Details Failure',
	UserChangePassword = '[User] Change Password',
	UserChangePasswordSuccess = '[User] Change Password Success',
	UserChangePasswordFailure = '[User] CHange Password Failure',
	UserDeleteAccount = '[User] Delete Account',
	UserDeleteAccountSuccess = '[User] Delete Account Success',
	UserDeleteAccountFailure = '[User] Delete Account Failure',
}

export const UserInit = createAction(UserActionsNames.UserInit);

export const UserInitSuccess = createAction(
	UserActionsNames.UserInitSuccess,
	props<{
		id: number;
		email: string;
		firstName: string;
		lastName: string;
		phone: string;
		address: string;
		city: string;
		token: string;
	}>()
);

export const UserInitFailure = createAction(
	UserActionsNames.UserInitFailure,
	props<{ user: undefined }>()
);

export const UserLogin = createAction(
	UserActionsNames.UserLogin,
	props<{ email: string; password: string }>()
);

export const UserLoginSuccess = createAction(
	UserActionsNames.UserLoginSuccess,
	props<{ user: User }>()
);

export const UserLoginFailure = createAction(
	UserActionsNames.UserLoginFailure,
	props<{ error: string | null }>()
);

export const UserRegister = createAction(
	UserActionsNames.UserRegister,
	props<{
		email: string;
		password: string;
		firstName: string;
		lastName: string;
		phone: string;
		address: string;
		city: string;
	}>()
);

export const UserRegisterSuccess = createAction(
	UserActionsNames.UserRegisterSuccess,
	props<{ user: User }>()
);

export const UserRegisterFailure = createAction(
	UserActionsNames.UserRegisterFailure,
	props<{ error: string | null }>()
);

export const UserLogout = createAction(
	UserActionsNames.UserLogout,
	props<{ token: string }>()
);

export const UserLogoutSuccess = createAction(
	UserActionsNames.UserLogoutSuccess,
	props<{ message: string }>()
);

export const UserLogoutFailure = createAction(
	UserActionsNames.UserLogoutFailure,
	props<{ error: string | null }>()
);

export const UserValidate = createAction(
	UserActionsNames.UserValidate,
	props<{ token: string }>()
);

export const UserValidateSuccess = createAction(
	UserActionsNames.UserValidateSuccess,
	props<{ user: User }>()
);

export const UserValidateFailure = createAction(
	UserActionsNames.UserValidateFailure,
	props<{ error: string | null }>()
);

export const UserChangeDetails = createAction(
	UserActionsNames.UserChangeDetails,
	props<{
		email: string;
		firstName: string;
		lastName: string;
		phone: string;
		address: string;
		city: string;
	}>()
);

export const UserChangeDetailsSuccess = createAction(
	UserActionsNames.UserChangeDetailsSuccess,
	props<{ data: User }>()
);

export const UserChangeDetailsFailure = createAction(
	UserActionsNames.UserChangeDetailsFailure,
	props<{ error: string | null }>()
);

export const UserChangePassword = createAction(
	UserActionsNames.UserChangePassword,
	props<{ password: string }>()
);

export const UserChangePasswordSuccess = createAction(
	UserActionsNames.UserChangePasswordSuccess,
	props<{ message: string }>()
);

export const UserChangePasswordFailure = createAction(
	UserActionsNames.UserChangePasswordFailure,
	props<{ error: string | null }>()
);

export const UserDeleteAccount = createAction(
	UserActionsNames.UserDeleteAccount,
	props<{ id: number }>()
);

export const UserDeleteAccountSuccess = createAction(
	UserActionsNames.UserDeleteAccountSuccess,
	props<{ message: string }>()
);

export const userDeleteAccountFailure = createAction(
	UserActionsNames.UserDeleteAccountFailure,
	props<{ error: string | null }>()
);
