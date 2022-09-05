import { initialPostingState, PostingState } from './posting.state';
import * as postingActions from './posting.actions';
import { Action, createReducer, on } from '@ngrx/store';

// 	// Actions for checking user, and handling in-post data
// 	PostingLoadDevices = '[Posting] Load Devices',
// 	PostingLoadDevicesSuccess = '[Posting] Load Devices Success',
// 	PostingLoadDevicesFailure = '[Posting] Load Devices Failure',
// 	PostingGetSelectedDevice = '[Posting] Get Selected Device',
// 	PostingGetSelectedDeviceSuccess = '[Posting] Get Selected Device Success',
// 	PostingGetSelectedDeviceFailure = '[Posting] Get Selected Device Failure',
// 	PostingLoadUser = '[Posting] Load User',
// 	PostingLoadUserSuccess = '[Posting] Load User Success',
// 	PostingLoadUserFailure = '[Posting] Load User Failure',

export const _userReducer = createReducer(
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
		details: data,
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
        error: null
    })),
    on(postingActions.PostingLoadDevicesSuccess, (state, {data}) => ({
        ...state,
        devices: data,
        loaded: true,
        error: null
    })),
    on(postingActions.PostingLoadDevicesFailure, (state, {error}) => ({
        ...state,
        loaded: false,
        error
    }))
);

export function postingReducer(
	state: PostingState | undefined,
	action: Action
) {
	return _userReducer(state, action);
}
