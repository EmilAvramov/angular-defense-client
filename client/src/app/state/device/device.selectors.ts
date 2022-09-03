import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DeviceState, DEVICE_FEATURE_KEY } from './device.state';

export const getDeviceState =
	createFeatureSelector<DeviceState>(DEVICE_FEATURE_KEY);

export const getDevices = createSelector(
	getDeviceState,
	(state: DeviceState) => state.devices
);

export const getDeviceLoaded = createSelector(
	getDeviceState,
	(state: DeviceState) => state.loaded
);

export const getDevicesError = createSelector(
	getDeviceState,
	(state: DeviceState) => state.error
);
