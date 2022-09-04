import { createAction, props } from '@ngrx/store';
import { Device } from '../device/device.state';
import { UserAuth } from '../user/user.state';
import { Posting, PostingPayload } from './posting.state';

export enum PostingActionNames {
	// Actions for Posting List View
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
	// Actions for Posting CRUD
	PostingCreate = '[Posting] Create',
	PostingCreateSuccess = '[Posting] Create Success',
	PostingCreateFailure = '[Posting] Create Failure',
	PostingEdit = '[Posting] Edit',
	PostingEditSuccess = '[Posting] Edit Success',
	PostingEditFailure = '[Posting] Edit Failure',
	PostingDelete = '[Posting] Delete',
	PostingDeleteSuccess = '[Posting] Delete Success',
	PostingDeleteFailure = '[Posting] Delete Failure',
	PostingCheckOwner = '[Posting] Check Owner',
	PostingCheckOwnerSuccess = '[Posting] Check Owner Success',
	PostingCheckOwnerFailure = '[Posting] Check Owner Failure',
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

export const PostingSearch = createAction(
	PostingActionNames.PostingSearch,
	props<{ query: string; limit: number; offset: number }>()
);

export const PostingSearchSuccess = createAction(
	PostingActionNames.PostingSearchSuccess,
	props<{ data: Posting[] }>()
);

export const PostingSearchFailure = createAction(
	PostingActionNames.PostingLoadMoreFailure,
	props<{ error: string | null }>()
);

export const PostingLoadMore = createAction(
	PostingActionNames.PostingLoadMore,
	props<{ limit: number; offset: number }>()
);

export const PostingLoadMoreSuccess = createAction(
	PostingActionNames.PostingLoadMoreSuccess,
	props<{ data: Posting[] }>()
);

export const PostingLoadMoreFailure = createAction(
	PostingActionNames.PostingLoadMoreFailure,
	props<{ error: string | null }>()
);

export const PostingGetDetails = createAction(
	PostingActionNames.PostingGetDetails,
	props<{ id: number }>()
);

export const PostingGetDetailsSuccess = createAction(
	PostingActionNames.PostingGetDetailsSuccess,
	props<{ data: Posting }>()
);

export const PostingGetDetailsFailure = createAction(
	PostingActionNames.PostingGetDetailsFailure,
	props<{ error: string | null }>()
);

export const PostingCreate = createAction(
	PostingActionNames.PostingCreate,
	props<{ payload: PostingPayload }>()
);

export const PostingCreateSuccess = createAction(
	PostingActionNames.PostingCreateSuccess,
	props<{ data: Posting }>()
);

export const PostingCreateFailure = createAction(
	PostingActionNames.PostingCreateFailure,
	props<{ error: string | null }>()
);

export const PostingEdit = createAction(
	PostingActionNames.PostingEdit,
	props<{ payload: PostingPayload }>()
);

export const PostingEditSuccess = createAction(
	PostingActionNames.PostingEditSuccess,
	props<{ data: Posting }>()
);

export const PostingEditFailure = createAction(
	PostingActionNames.PostingEditFailure,
	props<{ error: string | null }>()
);

export const PostingDelete = createAction(
	PostingActionNames.PostingDelete,
	props<{ id: number }>()
);

export const PostingDeleteSuccess = createAction(
	PostingActionNames.PostingDeleteSuccess,
	props<{ message: string }>()
);

export const PostingDeleteFailure = createAction(
	PostingActionNames.PostingDeleteFailure,
	props<{ error: string | null }>()
);

export const PostingCheckOwner = createAction(
	PostingActionNames.PostingCheckOwner,
	props<{ userEmail: string; postingEmail: string }>()
);

export const PostingCheckOwnerSuccess = createAction(
	PostingActionNames.PostingCheckOwnerSuccess,
	props<{ check: boolean }>()
);

export const PostingCheckOwnerFailure = createAction(
	PostingActionNames.PostingCheckOwnerFailure,
	props<{ error: string | null }>()
);

export const PostingLoadDevices = createAction(
	PostingActionNames.PostingLoadDevices,
	props<{ query: string; limit: number; offset: number }>()
);

export const PostingLoadDevicesSuccess = createAction(
	PostingActionNames.PostingLoadDevicesSuccess,
	props<{ data: Device[] }>()
);

export const PostingLoadDevicesFailure = createAction(
	PostingActionNames.PostingLoadDevicesFailure,
	props<{ error: string | null }>()
);

export const PostingLoadUser = createAction(PostingActionNames.PostingLoadUser);

export const PostingLoadUserSuccess = createAction(
	PostingActionNames.PostingLoadUserSuccess,
	props<{ user: UserAuth }>()
);

export const PostingLoadUserFailure = createAction(
	PostingActionNames.PostingLoadUserFailure,
	props<{ error: string | null }>()
);