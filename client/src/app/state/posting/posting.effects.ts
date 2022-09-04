import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, Observable, switchMap, of } from 'rxjs';

import { PostingService } from './posting.service';
import * as PostingActions from './posting.actions';
// import * as PostingSelectors from './posting.selectors';
import { PostingActionNames } from './posting.actions';
import { Posting, PostingState } from './posting.state';
import { Store } from '@ngrx/store';
import { UserFacade } from '../user/user.facade';

@Injectable()
export class DeviceEffects {
	constructor(
		private readonly store: Store<PostingState>,
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

	// TODO load devices, load user, get details, decide how to handle the below 2 
	// Either call the above in component through facade or integrate below

	// This needs validation
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

	// This needs validation
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

}
