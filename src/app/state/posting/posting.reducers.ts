import { Action, createReducer, on } from '@ngrx/store';

import { initialPostingState, Posting, PostingState } from './posting.state';
import * as postingActions from './posting.actions';

export const _postingReducer = createReducer(
	initialPostingState,
	on(postingActions.PostingInit, (state) => ({
		...state,
		loaded: false,
		error: null,
	})),
	on(postingActions.PostingInitSuccess, (state, { data }) => ({
		...state,
		postings: data,
		loaded: true,
		error: null,
	})),
	on(postingActions.PostingInitFailure, (state, { message }) => ({
		...state,
		loaded: false,
		error: message,
	})),
	on(postingActions.PostingLoadMore, (state) => ({
		...state,
		loaded: false,
		error: null,
	})),
	on(postingActions.PostingLoadMoreSuccess, (state, { data }) => ({
		...state,
		postings: data,
		loaded: true,
		error: null,
	})),
	on(postingActions.PostingLoadMoreFailure, (state, { message }) => ({
		...state,
		loaded: false,
		error: message,
	})),
	on(postingActions.PostingSearch, (state, { query }) => ({
		...state,
		query,
		loaded: false,
		error: null,
	})),
	on(postingActions.PostingSearchSuccess, (state, { data }) => ({
		...state,
		postings: data,
		query: '',
		loaded: true,
		error: null,
	})),
	on(postingActions.PostingSearchFailure, (state, { message }) => ({
		...state,
		query: '',
		loaded: false,
		error: message,
	})),
	on(postingActions.PostingGetDetails, (state) => ({
		...state,
		loaded: false,
		error: null,
	})),
	on(postingActions.PostingGetDetailsSuccess, (state, { data }) => ({
		...state,
		postingsDetails: data,
		loaded: true,
		error: null,
	})),
	on(postingActions.PostingGetDetailsFailure, (state, { message }) => ({
		...state,
		loaded: false,
		error: message,
	})),
	on(postingActions.PostingCreate, (state) => ({
		...state,
		create: null,
		loaded: false,
		error: null,
	})),
	on(postingActions.PostingCreateSuccess, (state, { data }) => ({
		...state,
		create: data,
		loaded: true,
		error: null,
	})),
	on(postingActions.PostingCreateFailure, (state, { message }) => ({
		...state,
		create: null,
		loaded: false,
		error: message,
	})),
	on(postingActions.PostingEdit, (state) => ({
		...state,
		loaded: false,
		error: null,
	})),
	on(postingActions.PostingEditSuccess, (state, { data }) => ({
		...state,
		create: data,
		loaded: true,
		error: null,
	})),
	on(postingActions.PostingEditFailure, (state, { message }) => ({
		...state,
		loaded: false,
		error: message,
	})),
	on(postingActions.PostingDelete, (state) => ({
		...state,
		loaded: false,
		error: null,
	})),
	on(postingActions.PostingDeleteSuccess, (state, { data }) => ({
		...state,
		postings: state.postings!.filter((x: Posting) => data.id !== x.id),
		loaded: true,
		error: null,
	})),
	on(postingActions.PostingDeleteFailure, (state, { message }) => ({
		...state,
		loaded: false,
		error: message,
	})),
	on(postingActions.PostingLoadDevices, (state) => ({
		...state,
		loaded: false,
		error: null,
	})),
	on(postingActions.PostingLoadDevicesSuccess, (state, { data }) => ({
		...state,
		devices: data,
		loaded: true,
		error: null,
	})),
	on(postingActions.PostingLoadDevicesFailure, (state, { message }) => ({
		...state,
		loaded: false,
		error: message,
	})),
	on(postingActions.PostingLoadDeviceDetails, (state) => ({
		...state,
		loaded: false,
		error: null,
	})),
	on(postingActions.PostingLoadDeviceDetailsSuccess, (state, { data }) => ({
		...state,
		devicesDetails: data,
		loaded: true,
		error: null,
	})),
	on(postingActions.PostingLoadDeviceDetailsFailure, (state, { message }) => ({
		...state,
		loaded: false,
		error: message,
	})),
	on(postingActions.PostingClearDeviceDetails, (state) => ({
		...state,
		loaded: false,
		error: null,
	})),
	on(postingActions.PostingClearDeviceDetailsSuccess, (state) => ({
		...state,
		devicesDetails: null,
		loaded: true,
		error: null,
	})),
	on(postingActions.PostingClearDeviceDetailsFailure, (state, { message }) => ({
		...state,
		devices: null,
		devicesDetails: null,
		loaded: false,
		error: message,
	})),
	on(postingActions.PostingLoadUser, (state) => ({
		...state,
		loaded: false,
		error: null,
	})),
	on(postingActions.PostingLoadUserSuccess, (state, { user }) => ({
		...state,
		user,
		loaded: true,
		error: null,
	})),
	on(postingActions.PostingLoadUserFailure, (state, { message }) => ({
		...state,
		user: null,
		loaded: false,
		error: message,
	}))
);

export function postingReducer(
	state: PostingState | undefined,
	action: Action
) {
	return _postingReducer(state, action);
}
