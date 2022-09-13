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
	on(deviceActions.DeviceInitFailure, (state, { message }) => ({
		...state,
		loaded: false,
		error: message,
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
	on(deviceActions.DeviceSearchFailure, (state, { message }) => ({
		...state,
		loaded: false,
		error: message,
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
	on(deviceActions.DeviceLoadMoreFailure, (state, { message }) => ({
		...state,
		loaded: false,
		error: message,
	})),

	on(deviceActions.DeviceGetDetails, (state) => ({
		...state,
	})),
	on(deviceActions.DeviceGetDetailsSuccess, (state, { data }) => ({
		...state,
		details: data,
	})),
	on(deviceActions.DeviceGetDetailsFailure, (state, { message }) => ({
		...state,
		error: message,
	}))
);

export function deviceReducer(state: DeviceState | undefined, action: Action) {
	return _deviceReducer(state, action);
}
