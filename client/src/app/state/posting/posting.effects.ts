import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, Observable, switchMap, of } from 'rxjs';

import { PostingService } from './posting.service';
import * as PostingActions from './posting.actions';
import * as PostingSelectors from './posting.selectors';
import { PostingActionNames } from './posting.actions';
import { Posting, PostingState } from './posting.state';

import { UserFacade } from '../user/user.facade';
import { UserAuth } from '../user/user.state';
import { Device } from '../device/device.state';

@Injectable()
export class DeviceEffects {
	constructor(
		private readonly postingStore: Store<PostingState>,
		private readonly actions$: Actions,
		private readonly postingService: PostingService,
		private readonly userFacade: UserFacade
	) {}

	public readonly getPostings$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(PostingActionNames.PostingInit),
			map(({ limit, offset }) => PostingActions.PostingInit({ offset, limit })),
			switchMap(({ limit, offset }) =>
				this.postingService
					.getPostings(limit, offset)
					.pipe(
						map((data: Posting[]) => PostingActions.PostingInitSuccess({ data }))
					)
			),
			catchError((error: string | null) =>
				of(PostingActions.PostingInitFailure({ error }))
			)
		)
	);

	public readonly loadMore$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(PostingActionNames.PostingLoadMore),
			map(({ limit, offset }) =>
				PostingActions.PostingLoadMore({ limit, offset })
			),
			switchMap(({ limit, offset }) =>
				this.postingService
					.getPostings(limit, offset)
					.pipe(
						map((data: Posting[]) => PostingActions.PostingLoadMoreSuccess({ data }))
					)
			),
			catchError((error: string | null) =>
				of(PostingActions.PostingLoadMoreFailure({ error }))
			)
		)
	);

	public readonly runQuery$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(PostingActionNames.PostingSearch),
			map(({ query, limit, offset }) =>
				PostingActions.PostingSearch({ query, limit, offset })
			),
			switchMap(({ query, limit, offset }) =>
				this.postingService
					.searchPostings(query, limit, offset)
					.pipe(
						map((data: Posting[]) => PostingActions.PostingSearchSuccess({ data }))
					)
			),
			catchError((error: string | null) =>
				of(PostingActions.PostingSearchFailure({ error }))
			)
		)
	);

	public readonly postingDetails$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(PostingActionNames.PostingGetDetails),
			map(({ id }) => PostingActions.PostingGetDetails({ id })),
			switchMap(({ id }) =>
				this.postingStore.pipe(
					select(PostingSelectors.getPostingDetails(id)),
					map((posting: Posting) =>
						PostingActions.PostingGetDetailsSuccess({ data: posting })
					)
				)
			),
			catchError((error: string | null) =>
				of(PostingActions.PostingGetDetailsFailure({ error }))
			)
		)
	);

	public readonly createPosting$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(PostingActionNames.PostingCreate),
			map(({ payload }) => PostingActions.PostingCreate({ payload })),
			switchMap(({ payload }) =>
				this.postingService
					.createPosting(payload)
					.pipe(
						map((data: Posting) => PostingActions.PostingCreateSuccess({ data }))
					)
			),
			catchError((error: string | null) =>
				of(PostingActions.PostingCreateFailure({ error }))
			)
		)
	);

	public readonly editPosting$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(PostingActionNames.PostingEdit),
			map(({ id, comments, price }) =>
				PostingActions.PostingEdit({ id, comments, price })
			),
			switchMap(({ id, comments, price }) =>
				this.postingService
					.editPosting(id, comments, price)
					.pipe(map((data: Posting) => PostingActions.PostingEditSuccess({ data })))
			),
			catchError((error: string | null) =>
				of(PostingActions.PostingEditFailure({ error }))
			)
		)
	);

	public readonly deletePosting$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(PostingActionNames.PostingDelete),
			map(({ id }) => PostingActions.PostingDelete({ id })),
			switchMap(({ id }) =>
				this.postingService
					.deletePosting(id)
					.pipe(
						map((message: string) => PostingActions.PostingDeleteSuccess({ message }))
					)
			),
			catchError((error: string | null) =>
				of(PostingActions.PostingDeleteFailure({ error }))
			)
		)
	);

	public readonly loadDevices$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(PostingActionNames.PostingLoadDevices),
			map(({ query, limit }) =>
				PostingActions.PostingLoadDevices({ query, limit })
			),
			switchMap(({ query, limit }) =>
				this.postingService
					.searchDevices(query, limit)
					.pipe(
						map((data: Device[]) =>
							PostingActions.PostingLoadDevicesSuccess({ data })
						)
					)
			),
			catchError((error: string | null) =>
				of(PostingActions.PostingLoadDevicesFailure({ error }))
			)
		)
	);

	public readonly selectedDeviceDetails$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(PostingActionNames.PostingGetSelectedDevice),
			map(({ key }) => PostingActions.PostingGetSelectedDevice({ key })),
			switchMap(({ key }) =>
				this.postingStore.pipe(
					select(PostingSelectors.getDeviceDetails(key)),
					map((data: Device) =>
						PostingActions.PostingGetSelectedDeviceSuccess({ data })
					)
				)
			),
			catchError((error: string | null) =>
				of(PostingActions.PostingGetSelectedDeviceFailure({ error }))
			)
		)
	);

	public readonly loadUser$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(PostingActionNames.PostingLoadUser),
			switchMap(() =>
				this.userFacade.userData$.pipe(
					map((user: UserAuth) => PostingActions.PostingLoadUserSuccess({ user }))
				)
			),
			catchError((error: string | null) =>
				of(PostingActions.PostingLoadUserFailure({ error }))
			)
		)
	);

	public readonly checkOwner$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(PostingActionNames.PostingCheckOwner),
			map(({ token, postingEmail }) =>
				PostingActions.PostingCheckOwner({ token, postingEmail })
			),
			switchMap(async ({ token, postingEmail }) => {
				let validatedDetails = await this.userFacade.validateUser(token);
				if (validatedDetails.email === postingEmail) {
					return PostingActions.PostingCheckOwnerSuccess({ check: true });
				} else {
					return PostingActions.PostingCheckOwnerSuccess({ check: false });
				}
			}),
			catchError((error: string | null) =>
				of(PostingActions.PostingCheckOwnerFailure({ error }))
			)
		)
	);
}
