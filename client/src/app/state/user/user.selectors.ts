import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, USER_FEATURE_KEY } from './user.state';

export const getUserState = createFeatureSelector<UserState>(USER_FEATURE_KEY);

export const getUser = createSelector(getUserState, (state: UserState) => {
	return {
		id: state.id,
		email: state.email,
		firstName: state.firstName,
		lastName: state.lastName,
		phone: state.phone,
		address: state.address,
		city: state.city,
		token: state.token,
	};
});

export const getUserId = createSelector(
	getUserState,
	(state: UserState) => state.id
);

export const getUserToken = createSelector(
	getUserState,
	(state: UserState) => state.token
);

export const getUserLoaded = createSelector(
	getUserState,
	(state: UserState) => state.loaded
);

export const getUserError = createSelector(
	getUserState,
	(state: UserState) => state.error
);

export const getValidatedUser = createSelector(
	getUserState,
	(state: UserState) => state.validated
);
