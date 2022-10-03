import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, Observable, switchMap, of } from 'rxjs';

import { PostingService } from './posting.service';
import * as PostingActions from './posting.actions';
import * as PostingSelectors from './posting.selectors';
import { PostingActionNames } from './posting.actions';
import { Error, Posting, PostingState } from './posting.state';

import { UserFacade } from '../user/user.facade';
import { User } from '../user/user.state';
import { Device } from '../device/device.state';

@Injectable()
export class PostingEffects {
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
				this.postingService.getPostings(limit, offset).pipe(
					map((data: Posting[]) => PostingActions.PostingInitSuccess({ data })),
					catchError((error: Error) =>
						of(PostingActions.PostingInitFailure({ message: error.error.message }))
					)
				)
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
				this.postingService.getPostings(limit, offset).pipe(
					map((data: Posting[]) => PostingActions.PostingLoadMoreSuccess({ data })),
					catchError((error: Error) =>
						of(
							PostingActions.PostingLoadMoreFailure({ message: error.error.message })
						)
					)
				)
			)
		)
	);

	public readonly searchPostings$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(PostingActionNames.PostingSearch),
			map(({ query, limit, offset }) =>
				PostingActions.PostingSearch({ query, limit, offset })
			),
			switchMap(({ query, limit, offset }) =>
				this.postingService.searchPostings(query, limit, offset).pipe(
					map((data: Posting[]) => PostingActions.PostingSearchSuccess({ data })),
					catchError((error: Error) =>
						of(PostingActions.PostingSearchFailure({ message: error.error.message }))
					)
				)
			)
		)
	);

	public readonly postingDetails$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(PostingActionNames.PostingGetDetails),
			map(({ id }) => PostingActions.PostingGetDetails({ id })),
			switchMap(({ id }) =>
				this.postingStore.pipe(
					select(PostingSelectors.filterPostings(id)),
					map((posting: Posting) =>
						PostingActions.PostingGetDetailsSuccess({ data: posting })
					),
					catchError((error: Error) =>
						of(
							PostingActions.PostingGetDetailsFailure({ message: error.error.message })
						)
					)
				)
			)
		)
	);

	public readonly createPosting$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(PostingActionNames.PostingCreate),
			map(({ payload }) => PostingActions.PostingCreate({ payload })),
			switchMap(({ payload }) =>
				this.postingService.createPosting(payload).pipe(
					map((data: Posting) => PostingActions.PostingCreateSuccess({ data })),
					catchError((error: Error) =>
						of(PostingActions.PostingCreateFailure({ message: error.error.message }))
					)
				)
			)
		)
	);

	public readonly editPosting$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(PostingActionNames.PostingEdit),
			map(({ id, comments, price, token }) =>
				PostingActions.PostingEdit({ id, comments, price, token })
			),
			switchMap(({ id, comments, price, token }) =>
				this.postingService.editPosting(id, comments, price, token).pipe(
					map((data: Posting) => PostingActions.PostingEditSuccess({ data })),
					catchError((error: Error) =>
						of(PostingActions.PostingEditFailure({ message: error.error.message }))
					)
				)
			)
		)
	);

	public readonly deletePosting$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(PostingActionNames.PostingDelete),
			map(({ id, token }) => PostingActions.PostingDelete({ id, token })),
			switchMap(({ id, token }) =>
				this.postingService.deletePosting(id, token).pipe(
					map((data: Posting) => PostingActions.PostingDeleteSuccess({ data })),
					catchError((error: Error) =>
						of(PostingActions.PostingDeleteFailure({ message: error.error.message }))
					)
				)
			)
		)
	);

	public readonly searchDevices$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(PostingActionNames.PostingLoadDevices),
			map(({ query, limit }) =>
				PostingActions.PostingLoadDevices({ query, limit })
			),
			switchMap(({ query, limit }) =>
				this.postingService.searchDevices(query, limit).pipe(
					map((data: Device[]) =>
						PostingActions.PostingLoadDevicesSuccess({ data })
					),
					catchError((error: Error) =>
						of(
							PostingActions.PostingLoadDevicesFailure({
								message: error.error.message,
							})
						)
					)
				)
			)
		)
	);

	public readonly deviceDetails$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(PostingActionNames.PostingLoadDeviceDetails),
			map(({ key }) => PostingActions.PostingLoadDeviceDetails({ key })),
			switchMap(({ key }) =>
				this.postingStore.pipe(
					select(PostingSelectors.filterDevices(key)),
					map((data: Device) =>
						PostingActions.PostingLoadDeviceDetailsSuccess({ data })
					),
					catchError((error: Error) =>
						of(
							PostingActions.PostingLoadDeviceDetailsFailure({
								message: error.error.message,
							})
						)
					)
				)
			)
		)
	);

	public readonly getUser$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(PostingActionNames.PostingLoadUser),
			switchMap(() =>
				this.userFacade.userData$.pipe(
					map((user: User) => PostingActions.PostingLoadUserSuccess({ user })),
					catchError((error: Error) =>
						of(
							PostingActions.PostingLoadUserFailure({ message: error.error.message })
						)
					)
				)
			)
		)
	);
}
