export const EXTERNAL_FEATURE_KEY = 'external';

export const initialExternalState: ExternalState = {
	latest: null,
	popular: null,
	loaded: false,
	error: null,
};

export interface ExternalState {
	latest: LatestDevice[] | null;
	popular: PopularDevice[] | null;
	loaded: boolean;
	error: null | string;
}

export interface ExternalDataRequest {
	latest: LatestDevice[] | null;
	popular: PopularDevice[] | null;
}

export interface LatestDevice {
	deviceName: string;
	deviceImage: string;
	deviceKey: string;
}

export interface PopularDevice {
	rank: number;
	deviceName: string;
	dailyHits: number;
	deviceKey: string;
}

export interface Error {
	error: Message;
	message: string;
	name: string;
	ok: boolean;
	status: number;
	statusText: string;
	url: string;
}

export interface Message {
	message: string | null
}