import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExternalState, EXTERNAL_FEATURE_KEY } from './external.state';

export const getExternalState =
	createFeatureSelector<ExternalState>(EXTERNAL_FEATURE_KEY);

export const getPopular = createSelector(
	getExternalState,
	(state: ExternalState) => state.popular
);

export const getLatest = createSelector(
	getExternalState,
	(state: ExternalState) => state.latest
);

export const getExternalLoaded = createSelector(
	getExternalState,
	(state: ExternalState) => state.loaded
);

export const getExternalsError = createSelector(
	getExternalState,
	(state: ExternalState) => state.error
);
