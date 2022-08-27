export interface Device {
    deviceId: number,
    deviceImage: string,
    deviceKey: string,
    deviceName: string,
    deviceType: string,
    fkBrand: string,
    Brand: {
        brandId: number,
        brandKey: string,
        brandName: string
    }
}

export interface DeviceDetails {
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