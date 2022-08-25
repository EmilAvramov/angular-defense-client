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

export interface HomeRequest {
	latest: LatestDevice[];
	popular: PopularDevice[];
}
