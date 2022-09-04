import { createAction, props } from '@ngrx/store';
import { Posting } from './posting.state';

export enum PostingActionNames {
	PostingInit = '[Posting] Init',
	PostingInitSuccess = '[Posting] Init Success',
	PostingInitFailure = '[Posting] Init Failure',
	PostingSearch = '[Posting] Search',
	PostingSearchSuccess = '[Posting] Search Success',
	PostingSearchFailure = '[Posting] Search Failure',
	PostingLoadMore = '[Posting] Load More',
	PostingLoadMoreSuccess = '[Posting] Load More Success',
	PostingLoadMoreFailure = '[Posting] Load More Failure',
	PostingGetDetails = '[Posting] Get Details',
	PostingGetDetailsSuccess = '[Posting] Get Details Success',
	PostingGetDetailsFailure = '[Posting] Get Details Failure',
	PostingCreate = '[Posting] Create',
	PostingCreateSuccess = '[Posting] Create Success',
	PostingCreateFailure = '[Posting] Create Failure',
	PostingLoadDevices = '[Posting] Load Devices',
	PostingLoadDevicesSuccess = '[Posting] Load Devices Success',
	PostingLoadDevicesFailure = '[Posting] Load Devices Failure',
	PostingLoadUser = '[Posting] Load User',
	PostingLoadUserSuccess = '[Posting] Load User Success',
	PostingLoadUserFailure = '[Posting] Load User Failure',
}

export const PostingInit = createAction(
	PostingActionNames.PostingInit,
	props<{ limit: number; offset: number }>()
);

export const PostingInitSuccess = createAction(
	PostingActionNames.PostingInitSuccess,
	props<{ data: Posting[] }>()
);

export const PostingInitFailure = createAction(
	PostingActionNames.PostingInitFailure,
	props<{ error: string | null }>()
);