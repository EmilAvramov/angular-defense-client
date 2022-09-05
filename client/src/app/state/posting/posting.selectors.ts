import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Device } from '../device/device.state';
import { Posting, PostingState, POSTING_FEATURE_KEY } from './posting.state';

export const getPostingState =
	createFeatureSelector<PostingState>(POSTING_FEATURE_KEY);

export const getPostings = createSelector(
	getPostingState,
	(state: PostingState) => state.postings
);

export const getPostingDetails = createSelector(
	getPostingState,
	(state: PostingState) => state.postingsDetails
);

export const getPostingDevices = createSelector(
	getPostingState,
	(state: PostingState) => state.devices
);

export const getDeviceDetails = createSelector(
	getPostingState,
	(state: PostingState) => state.devicesDetails
);

export const getPostingUser = createSelector(
	getPostingState,
	(state: PostingState) => state.user
);

export const getCreatedPosting = createSelector(
	getPostingState,
	(state: PostingState) => state.create
);

export const getPostingLoaded = createSelector(
	getPostingState,
	(state: PostingState) => state.loaded
);

export const getPostingError = createSelector(
	getPostingState,
	(state: PostingState) => state.error
);

export const filterPostings = (id: number) =>
	createSelector(
		getPostingState,
		(state: PostingState) =>
			state.postings!.filter((x: Posting) => x.id === id)[0]
	);

export const filterDevices = (key: string) =>
	createSelector(
		getPostingState,
		(state: PostingState) =>
			state.devices!.filter((x: Device) => x.deviceKey === key)[0]
	);
