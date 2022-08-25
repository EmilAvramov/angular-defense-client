import {
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize/types';

export interface PhoneAd
	extends Model<InferAttributes<PhoneAd>, InferCreationAttributes<PhoneAd>> {
	id: CreationOptional<number>;
	key: string;
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