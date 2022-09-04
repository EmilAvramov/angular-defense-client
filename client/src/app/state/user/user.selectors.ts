import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, USER_FEATURE_KEY } from './user.state';

export const getUserState = createFeatureSelector<UserState>(USER_FEATURE_KEY);

export const getUser = createSelector(getUserState, (state: UserState) => {
	return {
		email: state.email,
		firstName: state.firstName,
		lastName: state.lastName,
		phone: state.phone,
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