import { Device } from '../device/device.state';
import { UserAuth } from '../user/user.state';

export const POSTING_FEATURE_KEY = 'user'

export const initialPostingState: PostingState = {
    postings: null,

    query: '',
    details: null,
	detailsFilter: '',

    create: null,
    devices: null,
    user: null,
    
	loaded: false,
	error: null,
};

export interface PostingState {
    postings: Posting[] | null,

    query: string | null,
    details: Posting | null,
	detailsFilter: string | null,

    create: Posting | null,
    devices: Device[] | null,
    user: UserAuth | null,

	loaded: boolean,
	error: null | string,
}

export interface Posting {
	id: number | null;
	userEmail: string;
	deviceKey: string;
	comments: string;
	price: number | null;
	User: UserAuth | null;
	Device: Device | null;
}

export interface PostingPayload {
	userEmail: string;
	deviceKey: string;
	comments: string;
	price: number;
}