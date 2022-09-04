import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Posting, PostingState, POSTING_FEATURE_KEY } from './posting.state';

export const getPostingState =
	createFeatureSelector<PostingState>(POSTING_FEATURE_KEY);

export const getPosting = createSelector(
	getPostingState,
	(state: PostingState) => {
		return {
			postings: state.postings,
			query: state.query,
			details: state.details,
			detailsFilter: state.detailsFilter,
			create: state.create,
			devices: state.devices,
			user: state.user,
		};
	}
);

export const getPostingUser = createSelector(
	getPostingState,
	(state: PostingState) => state.user
);

export const getPostingDevices = createSelector(
	getPostingState,
	(state: PostingState) => state.devices
);

export const getActiveDetails = createSelector(
	getPostingState,
	(state: PostingState) => state.details
);

export const getPostingLoaded = createSelector(
	getPostingState,
	(state: PostingState) => state.loaded
);

export const getPostingError = createSelector(
	getPostingState,
	(state: PostingState) => state.error
);

export const getPostingDetails = (id: number) =>
	createSelector(
		getPostingState,
		(state: PostingState) =>
			state.postings!.filter((x: Posting) => x.id === id)[0]
	);