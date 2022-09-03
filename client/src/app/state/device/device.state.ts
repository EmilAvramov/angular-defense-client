export const DEVICE_FEATURE_KEY = 'device';

export const initialDeviceState: DeviceState = {
	devices: null,
	query: '',
	details: null,
	detailsFilter: '',
	loaded: false,
	error: null,
};

export interface DeviceState {
	devices: Device[] | null;
	query: string | null,
	details: Device | null,
	detailsFilter: string | null,
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
