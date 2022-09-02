import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StorageState, UserState } from './user.models';
import { STORAGE_FEATURE_KEY, USER_FEATURE_KEY } from './user.state';

export const getUserState = createFeatureSelector<UserState>(USER_FEATURE_KEY);

export const getStorageState =
	createFeatureSelector<StorageState>(STORAGE_FEATURE_KEY);

export const getUser = createSelector(getUserState, (state: UserState) => {
	return {
		email: state.email,
		password: state.password,
		firstName: state.firstName,
		lastName: state.lastName,
		address: state.address,
		city: state.city,
		token: state.token,
	};
});

export const getUserLoaded = createSelector(
	getUserState,
	(state: UserState) => state.loaded
);

export const getUserError = createSelector(
	getUserState,
	(state: UserState) => state.error
);

export const getStorage = createSelector(
	getStorageState,
	(state: StorageState) => {
		return {
			email: state.email,
			firstName: state.firstName,
			lastName: state.lastName,
			address: state.address,
			city: state.city,
			token: state.token,
		};
	}
);

export const getStorageLoaded = createSelector(
	getStorageState,
	(state: StorageState) => state.loaded
);

export const getStorageError = createSelector(
	getStorageState,
	(state: StorageState) => state.error
);
