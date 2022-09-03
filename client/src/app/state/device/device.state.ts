export const DEVICE_FEATURE_KEY = 'device';

export const initialDeviceState: DeviceState = {
	devices: [],
	query: '',
	details: null,
	detailsFilter: '',
	limit: 100,
	offset: 0,
	loaded: false,
	error: null,
};

export interface DeviceState {
	devices: Device[];
	query: string,
	details: Device | null,
	detailsFilter: string,
	limit: number;
	offset: number;
	loaded: boolean;
	error: string | null;
}

export interface Device {
	deviceKey: string;
	deviceName: string;
	deviceImage: string;
	connectivity: string;
	launchDate: string;
	dimensions: string;
	weight: string;
	build: string;
	sim: string;
	display: string;
	size: string;
	resolution: string;
	protection: string;
	os: string;
	chipset: string;
	cpu: string;
	gpu: string;
	cardSlot: string;
	internalStorage: string;
	cameraMain: string;
	videoMain: string;
	cameraSelfie: string;
	videoSelfie: string;
	speakers: string;
	jack: string;
	features: string;
	batteryCharge: string;
	batteryType: string;
	price: string;
}
