import { Action, createReducer, on } from '@ngrx/store';

import { initialExternalState, ExternalState } from './external.state';
import * as externalActions from './external.actions';

export const _externalReducer = createReducer(
	initialExternalState,
	on(externalActions.ExternalInit, (state) => ({
		...state,
		loaded: false,
		error: null,
	})),
	on(externalActions.ExternalInitSuccess, (state, { data }) => ({
		...state,
		latest: data.latest,
		popular: data.popular,
		loaded: true,
		error: null,
	})),
	on(externalActions.ExternalInitFailure, (state, { message }) => ({
		...state,
		loaded: false,
		error: message,
	}))
);

export function externalReducer(
	state: ExternalState | undefined,
	action: Action
) {
	return _externalReducer(state, action);
}
