import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, Observable, switchMap, of } from 'rxjs';

import { DeviceService } from './device.service';
import * as DeviceActions from './device.actions';
import * as DeviceSelectors from './device.selectors';
import { DeviceActionsNames } from './device.actions';
import { Device, DeviceState, Error } from './device.state';

@Injectable()
export class DeviceEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly deviceService: DeviceService,
		private readonly store: Store<DeviceState>
	) {}

	public readonly getDevices$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(DeviceActionsNames.DeviceInit),
			map(({ limit, offset }) => DeviceActions.DeviceInit({ limit, offset })),
			switchMap(({ limit, offset }) =>
				this.deviceService.getDevices(limit, offset).pipe(
					map((data: Device[]) => DeviceActions.DeviceInitSuccess({ data })),
					catchError((error: Error) =>
						of(DeviceActions.DeviceInitFailure({ message: error.error.message }))
					)
				)
			)
		)
	);

	public readonly searchDevices$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(DeviceActionsNames.DeviceSearch),
			map(({ query, limit, offset }) =>
				DeviceActions.DeviceSearch({ query, limit, offset })
			),
			switchMap(({ query, limit, offset }) =>
				this.deviceService.searchDevices(query, limit, offset).pipe(
					map((data: Device[]) => DeviceActions.DeviceSearchSuccess({ data })),
					catchError((error: Error) =>
						of(DeviceActions.DeviceSearchFailure({ message: error.error.message }))
					)
				)
			)
		)
	);

	public readonly loadMore$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(DeviceActionsNames.DeviceLoadMore),
			map(({ limit, offset }) => DeviceActions.DeviceLoadMore({ limit, offset })),
			switchMap(({ limit, offset }) =>
				this.deviceService.getDevices(limit, offset).pipe(
					map((data: Device[]) => DeviceActions.DeviceLoadMoreSuccess({ data })),
					catchError((error: Error) =>
						of(DeviceActions.DeviceLoadMoreFailure({ message: error.error.message }))
					)
				)
			)
		)
	);

	public readonly deviceDetails$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(DeviceActionsNames.DeviceGetDetails),
			map(({ key }) => DeviceActions.DeviceGetDetails({ key })),
			switchMap(({ key }) =>
				this.store.pipe(
					select(DeviceSelectors.getDeviceDetails(key)),
					map((data: Device) => DeviceActions.DeviceGetDetailsSuccess({ data })),
					catchError((error: Error) =>
						of(
							DeviceActions.DeviceGetDetailsFailure({ message: error.error.message })
						)
					)
				)
			)
		)
	);
}
