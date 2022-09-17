export const EXTERNAL_FEATURE_KEY = 'external';

export const initialExternalState: ExternalState = {
	latest: null,
    popular: null,
    loaded: false,
	error: null,
}

export interface ExternalState {
	latest: LatestDevice[] | null;
	popular: PopularDevice[] | null;
    loaded: boolean,
    error: null | string
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
