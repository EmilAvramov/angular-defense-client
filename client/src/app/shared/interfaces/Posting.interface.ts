export interface DevicePostingPayload {
	userEmail: string;
	deviceKey: string;
	comments: string;
    price: number;
}

export interface DevicePostingDetails {
	id: number,
	userEmail: string;
	deviceKey: string;
	comments: string;
    price: number;
	User: {
		email: string;
		password: string;
		firstName: string;
		lastName: string;
		phone: string;
		address: string;
		city: string;
	}, 
	DeviceDetail: {
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
}