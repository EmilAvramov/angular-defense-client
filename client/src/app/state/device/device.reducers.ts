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
		limit: 100,
		offset: 0,
		loaded: true,
		error: null,
	})),
	on(deviceActions.DeviceInitFailure, (state, { error }) => ({
		...state,
		loaded: false,
		error,
	})),
	on(deviceActions.DeviceSearch, (state, { query, limit, offset }) => ({
		...state,
		query,
		limit,
		offset,
		loaded: false,
		error: null,
	})),
	on(deviceActions.DeviceLoadMoreSuccess, (state, { data }) => ({
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
	on(deviceActions.DeviceLoadMore, (state, { limit, offset }) => ({
		...state,
		limit,
		offset,
		error: null,
	})),
	on(deviceActions.DeviceLoadMoreSuccess, (state, { data }) => ({
		...state,
		devices: { ...state.devices, data },
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
		loaded: false,
		error: null,
	})),
	on(deviceActions.DeviceGetDetailsSuccess, (state, { data }) => ({
		...state,
		details: data,
		detailsFilter: '',
		loaded: true,
		error: null,
	})),
	on(deviceActions.DeviceGetDetailsFailure, (state, { error }) => ({
		...state,
		loaded: false,
		error,
	}))
);

export function userReducer(state: DeviceState | undefined, action: Action) {
	return _deviceReducer(state, action);
}
