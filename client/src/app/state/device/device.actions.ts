import { createAction, props } from '@ngrx/store';
import { UserAuth } from './user.state';

export enum UserActionsNames {
	DeviceInit = '[Device] Init',
    DeviceInitSuccess = '[Device] Init Success',
    DeviceInitFailure = '[Device] Init Failure',
    DeviceLoadMore = '[Device] Load More',
    DeviceLoadMoreSuccess = '[Device] Load More Success'

}

export const UserLogin = createAction(
	UserActionsNames.UserLogin,
	props<{ email: string; password: string }>()
);

export const UserLoginSuccess = createAction(
	UserActionsNames.UserLoginSuccess,
	props<{ user: UserAuth }>()
);

export const UserLoginFailure = createAction(
	UserActionsNames.UserLoginFailure,
	props<{ error: string | null }>()
);