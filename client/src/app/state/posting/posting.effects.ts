import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, Observable, switchMap, of } from 'rxjs';

import { PostingService } from './posting.service';
import * as PostingActions from './posting.actions';
// import * as PostingSelectors from './posting.selectors';
import { PostingActionNames } from './posting.actions';
import { Posting, PostingState } from './posting.state';
import { select, Store } from '@ngrx/store';
import { StorageService } from '../user/user.service';

@Injectable()
export class DeviceEffects {
	constructor(
        private readonly store: Store<PostingState>,
		private readonly actions$: Actions,
		private readonly postingService: PostingService,
        private readonly storageService: StorageService
	) {}

	// public readonly getDevices$: Observable<any> = createEffect(() =>
	// 	this.actions$.pipe(
	// 		ofType(DeviceActionsNames.DeviceInit),
	// 		map(({ limit, offset }) => DeviceActions.DeviceInit({ limit, offset })),
	// 		switchMap(({ limit, offset }) =>
	// 			this.dataService
	// 				.requestDevices(limit, offset)
	// 				.pipe(map((data: Device[]) => DeviceActions.DeviceInitSuccess({ data })))
	// 		),
	// 		catchError((error: string | null) =>
	// 			of(DeviceActions.DeviceInitFailure({ error }))
	// 		)
	// 	)
	// );

	// public readonly runQuery$: Observable<any> = createEffect(() =>
	// 	this.actions$.pipe(
	// 		ofType(DeviceActionsNames.DeviceSearch),
	// 		map(({ query, limit, offset }) =>
	// 			DeviceActions.DeviceSearch({ query, limit, offset })
	// 		),
	// 		switchMap(({ query, limit, offset }) =>
	// 			this.dataService
	// 				.queryDevices(query, limit, offset)
	// 				.pipe(map((data: Device[]) => DeviceActions.DeviceSearchSuccess({ data })))
	// 		),
	// 		catchError((error: null | string) =>
	// 			of(DeviceActions.DeviceSearchFailure({ error }))
	// 		)
	// 	)
	// );

	// public readonly loadMore$: Observable<any> = createEffect(() =>
	// 	this.actions$.pipe(
	// 		ofType(DeviceActionsNames.DeviceLoadMore),
	// 		map(({ limit, offset }) => DeviceActions.DeviceLoadMore({ limit, offset })),
	// 		switchMap(({ limit, offset }) =>
	// 			this.dataService
	// 				.requestDevices(limit, offset)
	// 				.pipe(
	// 					map((data: Device[]) => DeviceActions.DeviceLoadMoreSuccess({ data }))
	// 				)
	// 		),
	// 		catchError((error: string | null) =>
	// 			of(DeviceActions.DeviceLoadMoreFailure({ error }))
	// 		)
	// 	)
	// );

	// public readonly getDetails$: Observable<any> = createEffect(() =>
	// 	this.actions$.pipe(
	// 		ofType(DeviceActionsNames.DeviceGetDetails),
	// 		map(({ key }) => DeviceActions.DeviceGetDetails({ key })),
	// 		switchMap(({ key }) =>
	// 			this.store.pipe(
	// 				select(DeviceSelectors.getDeviceDetails(key)),
	// 				map((data: Device) => DeviceActions.DeviceGetDetailsSuccess({ data }))
	// 			)
	// 		),
	// 		catchError((error: string | null) =>
	// 			of(DeviceActions.DeviceGetDetailsFailure({ error }))
	// 		)
	// 	)
	// );
}
