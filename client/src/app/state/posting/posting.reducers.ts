import { initialPostingState, PostingState } from './posting.state';
import * as postingActions from './posting.actions';
import { Action, createReducer, on } from '@ngrx/store';

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
        error: null
    })),
    on(postingActions.PostingLoadMoreSuccess, (state, {data}) => ({
        ...state,
        postings: data,
        loaded: true,
        error: null
    })),
    on(postingActions.PostingLoadMoreFailure, (state, {error}) => ({
        ...state,
        loaded: false,
        error
    })),
    on(postingActions.PostingSearch, (state, {query}) => ({
        ...state,
        query,
        loaded: false,
        error: null
    })),
    on(postingActions.PostingSearchSuccess, (state, {data}) => ({
        ...state,
        posting: data,
        query: '',
        loaded: true,
        error: null
    })),
    on(postingActions.PostingSearchFailure, (state, {error}) => ({
        ...state,
        query: '',
        loaded: false,
        error
    })),
    on(postingActions.PostingCreate, (state) => ({
        ...state,
        loaded: false,
        error: null
    })),
    on(postingActions.PostingCreateSuccess, (state, {data}) => ({
        ...state,
        create: data,
        loaded: true,
        error: null
    })),
    on(postingActions.PostingCreateFailure, (state, {error}) => ({
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
