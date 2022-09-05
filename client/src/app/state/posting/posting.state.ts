import { Device } from '../device/device.state';
import { User } from '../user/user.state';

export const POSTING_FEATURE_KEY = 'posting'

export const initialPostingState: PostingState = {
	postings: null,

	postingsQuery: '',
	postingsFilter: '',
	postingsDetails: null,

	devices: null,
	devicesQuery: '',
	devicesFilter: '',

	create: null,
	devicesDetails: null,
	user: null,

	loaded: false,
	error: null,
	
};

export interface PostingState {
    postings: Posting[] | null,

    postingsQuery: string | null,
	postingsFilter: string | null,
    postingsDetails: Posting | null,

	devices: Device[] | null,
	devicesQuery: string | null,
	devicesFilter: string | null,

	create: Posting | null,
    devicesDetails: Device | null,
    user: User | null,

	loaded: boolean,
	error: null | string,
}

export interface Posting {
	id: number;
	userEmail: string;
	deviceKey: string;
	comments: string;
	price: number | null;
	User: User | null;
	Device: Device | null;
}

export interface PostingPayload {
	userEmail: string;
	deviceKey: string;
	comments: string;
	price: number;
}