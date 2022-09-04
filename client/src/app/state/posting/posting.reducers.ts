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
	}))
);

export function postingReducer(
	state: PostingState | undefined,
	action: Action
) {
	return _userReducer(state, action);
}
