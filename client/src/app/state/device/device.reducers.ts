import { Action, createReducer, on } from '@ngrx/store';

import { initialDeviceState, DeviceState } from './device.state';
import * as deviceActions from './device.actions';

export const _deviceReducer = createReducer(
	initialDeviceState,
	on(deviceActions.DeviceInit, (state) => ({
		...state,
		loaded: false,
		error: null,
	})),
	on(deviceActions.DeviceInitSuccess, (state, { data }) => ({
		...state,
		devices: data,
		loaded: true,
		error: null,
	})),
	on(deviceActions.DeviceInitFailure, (state, { error }) => ({
		...state,
		loaded: false,
		error,
	})),

	on(deviceActions.DeviceSearch, (state) => ({
		...state,
		loaded: false,
		error: null,
	})),
	on(deviceActions.DeviceSearchSuccess, (state, { data }) => ({
		...state,
		devices: data,
		loaded: true,
		error: null,
	})),
	on(deviceActions.DeviceSearchFailure, (state, { error }) => ({
		...state,
		loaded: false,
		error,
	})),
	on(deviceActions.DeviceLoadMore, (state) => ({
		...state,
		loaded: false,
		error: null,
	})),
	on(deviceActions.DeviceLoadMoreSuccess, (state, { data }) => ({
		...state,
		devices: data,
		loaded: true,
		error: null,
	})),
	on(deviceActions.DeviceLoadMoreFailure, (state, { error }) => ({
		...state,
		loaded: false,
		error,
	})),

	on(deviceActions.DeviceGetDetails, (state) => ({
		...state,
	})),
	on(deviceActions.DeviceGetDetailsSuccess, (state, { data }) => ({
		...state,
		details: data,
	})),
	on(deviceActions.DeviceGetDetailsFailure, (state, { error }) => ({
		...state,
		error,
	}))
);

export function deviceReducer(state: DeviceState | undefined, action: Action) {
	return _deviceReducer(state, action);
}
