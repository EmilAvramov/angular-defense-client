import { createAction, props } from '@ngrx/store';
import { Device } from './device.state';

export enum DeviceActionsNames {
	DeviceInit = '[Device] Init',
	DeviceInitSuccess = '[Device] Init Success',
	DeviceInitFailure = '[Device] Init Failure',
	DeviceSearch = '[Device] Search',
	DeviceSearchSuccess = '[Device] Search Success',
	DeviceSearchFailure = '[Device] Search Failure',
	DeviceLoadMore = '[Device] Load More',
	DeviceLoadMoreSuccess = '[Device] Load More Success',
	DeviceLoadMoreFailure = '[Device] Load More Failure',
	DeviceGetDetails = '[Device] Get Details',
	DeviceGetDetailsSuccess = '[Device] Get Details Success',
	DeviceGetDetailsFailure = '[Device] Get Details Failure',
}

export const DeviceInit = createAction(
	DeviceActionsNames.DeviceInit,
	props<{ limit: number; offset: number }>()
);

export const DeviceInitSuccess = createAction(
	DeviceActionsNames.DeviceInitSuccess,
	props<{ data: Device[] }>()
);

export const DeviceInitFailure = createAction(
	DeviceActionsNames.DeviceInitFailure,
	props<{ message: string | null }>()
);

export const DeviceSearch = createAction(
	DeviceActionsNames.DeviceSearch,
	props<{ query: string; limit: number; offset: number }>()
);

export const DeviceSearchSuccess = createAction(
	DeviceActionsNames.DeviceSearchSuccess,
	props<{ data: Device[] | null }>()
);

export const DeviceSearchFailure = createAction(
	DeviceActionsNames.DeviceSearchFailure,
	props<{ message: string | null }>()
);

export const DeviceLoadMore = createAction(
	DeviceActionsNames.DeviceLoadMore,
	props<{ limit: number; offset: number }>()
);

export const DeviceLoadMoreSuccess = createAction(
	DeviceActionsNames.DeviceLoadMoreSuccess,
	props<{ data: Device[]}>()
);

export const DeviceLoadMoreFailure = createAction(
	DeviceActionsNames.DeviceLoadMoreFailure,
	props<{ message: string | null }>()
);

export const DeviceGetDetails = createAction(
	DeviceActionsNames.DeviceGetDetails,
	props<{ key: string }>()
);

export const DeviceGetDetailsSuccess = createAction(
	DeviceActionsNames.DeviceGetDetailsSuccess,
	props<{ data: Device }>()
);

export const DeviceGetDetailsFailure = createAction(
	DeviceActionsNames.DeviceGetDetailsFailure,
	props<{ message: string | null }>()
);
