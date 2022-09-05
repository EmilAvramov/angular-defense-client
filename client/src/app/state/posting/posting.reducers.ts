import { Action, createReducer, on } from '@ngrx/store';

import { initialPostingState, PostingState } from './posting.state';
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
	on(postingActions.PostingInitFailure, (state, { error }) => ({
		...state,
		loaded: false,
		error,
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
	on(postingActions.PostingLoadMoreFailure, (state, { error }) => ({
		...state,
		loaded: false,
		error,
	})),
	on(postingActions.PostingSearch, (state, { query }) => ({
		...state,
		query,
		loaded: false,
		error: null,
	})),
	on(postingActions.PostingSearchSuccess, (state, { data }) => ({
		...state,
		posting: data,
		query: '',
		loaded: true,
		error: null,
	})),
	on(postingActions.PostingSearchFailure, (state, { error }) => ({
		...state,
		query: '',
		loaded: false,
		error,
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
	on(postingActions.PostingGetDetailsFailure, (state, { error }) => ({
		...state,
		loaded: false,
		error,
	})),
	on(postingActions.PostingCreate, (state) => ({
		...state,
		loaded: false,
		error: null,
	})),
	on(postingActions.PostingCreateSuccess, (state, { data }) => ({
		...state,
		create: data,
		loaded: true,
		error: null,
	})),
	on(postingActions.PostingCreateFailure, (state, { error }) => ({
		...state,
		loaded: false,
		error,
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
	on(postingActions.PostingEditFailure, (state, { error }) => ({
		...state,
		loaded: false,
		error,
	})),
	on(postingActions.PostingDelete, (state) => ({
		...state,
		loaded: false,
		error: null,
	})),
	on(postingActions.PostingDeleteSuccess, (state) => ({
		...state,
		loaded: true,
		error: null,
	})),
	on(postingActions.PostingDeleteFailure, (state, { error }) => ({
		...state,
		loaded: false,
		error,
	})),
	on(postingActions.PostingCheckOwner, (state) => ({
		...state,
		loaded: false,
		error: null,
	})),
	on(postingActions.PostingCheckOwnerSuccess, (state) => ({
		...state,
		loaded: true,
		error: null,
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
	on(postingActions.PostingLoadDevicesFailure, (state, { error }) => ({
		...state,
		loaded: false,
		error,
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
	on(postingActions.PostingLoadDeviceDetailsFailure, (state, { error }) => ({
		...state,
		loaded: false,
		error,
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
	on(postingActions.PostingLoadUserFailure, (state, { error }) => ({
		...state,
		user: null,
		loaded: false,
		error,
	}))
);

export function postingReducer(
	state: PostingState | undefined,
	action: Action
) {
	return _postingReducer(state, action);
}
