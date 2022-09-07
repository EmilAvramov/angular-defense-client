import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import * as postingSelectors from './posting.selectors';
import * as postingActions from './posting.actions';

import { Posting, PostingPayload, PostingState } from './posting.state';
import { Device } from '../device/device.state';
import { User } from '../user/user.state';

@Injectable()
export class PostingFacade {
	constructor(private readonly store: Store<PostingState>) {}

	public readonly postingData$: Observable<Posting[] | null> = this.store.pipe(
		select(postingSelectors.getPostings)
	);

	public readonly postingDetails$: Observable<Posting | null> = this.store.pipe(
		select(postingSelectors.getPostingDetails)
	);

	public readonly devicesData$: Observable<Device[] | null> = this.store.pipe(
		select(postingSelectors.getPostingDevices)
	);

	public readonly deviceDetails$: Observable<Device | null> = this.store.pipe(
		select(postingSelectors.getDeviceDetails)
	);

	public readonly getUserPostings$: Observable<Posting[] | null> =
		this.store.pipe(select(postingSelectors.getUserPostings));

	public readonly createdPosting$: Observable<Posting | null> = this.store.pipe(
		select(postingSelectors.getCreatedPosting)
	);

	public readonly userData$: Observable<User | null> = this.store.pipe(
		select(postingSelectors.getPostingUser)
	);

	public readonly dataLoaded$: Observable<boolean> = this.store.pipe(
		select(postingSelectors.getPostingLoaded)
	);

	public readonly dataError$: Observable<any> = this.store.pipe(
		select(postingSelectors.getPostingError)
	);

	public initPostingsData(): void {
		this.store.dispatch(postingActions.PostingInit({ limit: 18, offset: 0 }));
	}

	public loadMorePostings(limit: number, offset: number): void {
		this.store.dispatch(postingActions.PostingLoadMore({ limit, offset }));
	}

	public queryPostings(query: string, limit: number, offset: number): void {
		this.store.dispatch(postingActions.PostingSearch({ query, limit, offset }));
	}

	public getPostingDetails(id: number): void {
		this.store.dispatch(postingActions.PostingGetDetails({ id }));
	}

	public loadUserPostings(id: number): void {
		this.store.dispatch(postingActions.PostingUserGet({ id }));
	}

	public queryDevices(query: string, limit: number): void {
		this.store.dispatch(postingActions.PostingLoadDevices({ query, limit }));
	}

	public getDeviceDetails(key: string): void {
		this.store.dispatch(postingActions.PostingLoadDeviceDetails({ key }));
	}

	public clearDeviceDetails(): void {
		this.store.dispatch(postingActions.PostingClearDeviceDetails());
	}

	public createPosting(payload: PostingPayload): void {
		this.store.dispatch(postingActions.PostingCreate({ payload }));
	}

	public editPosting(id: number, comments: string, price: number): void {
		this.store.dispatch(postingActions.PostingEdit({ id, comments, price }));
	}

	public deletePosting(id: number): void {
		this.store.dispatch(postingActions.PostingDelete({ id }));
	}
}
