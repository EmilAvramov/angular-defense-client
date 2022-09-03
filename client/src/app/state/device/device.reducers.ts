import { initialDeviceState, DeviceState, Device } from './device.state';
import * as deviceActions from './device.actions';
import { Action, createReducer, on } from '@ngrx/store';

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

	on(deviceActions.DeviceSearch, (state, { query }) => ({
		...state,
		query,
		loaded: false,
		error: null,
	})),
	on(deviceActions.DeviceSearchSuccess, (state, { data }) => ({
		...state,
		devices: data,
		query: '',
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

	on(deviceActions.DeviceGetDetails, (state, { key }) => ({
		...state,
		detailsFilter: key,
	})),
	on(deviceActions.DeviceGetDetailsSuccess, (state, { data }) => ({
		...state,
		details: data,
		detailsFilter: '',
	})),
	on(deviceActions.DeviceGetDetailsFailure, (state, { error }) => ({
		...state,
		error,
	}))
);

export function deviceReducer(state: DeviceState | undefined, action: Action) {
	return _deviceReducer(state, action);
}
