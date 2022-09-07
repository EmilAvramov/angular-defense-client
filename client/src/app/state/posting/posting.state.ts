import { Device } from '../device/device.state';
import { User } from '../user/user.state';

export const POSTING_FEATURE_KEY = 'posting';

export const initialPostingState: PostingState = {
	postings: null,
	postingsDetails: null,
	devices: null,
	devicesDetails: null,
	create: null,
	user: null,
	userPostings: null,
	loaded: false,
	error: null,
};

export interface PostingState {
	postings: Posting[] | null;
	postingsDetails: Posting | null;
	devices: Device[] | null;
	devicesDetails: Device | null;
	create: Posting | null;
	user: User | null;
	userPostings: Posting[] | null,
	loaded: boolean;
	error: null | string;
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
