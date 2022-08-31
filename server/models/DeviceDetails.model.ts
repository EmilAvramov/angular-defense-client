import { DataType } from 'sequelize-typescript';
import sequelize from '../config/database';
import { DeviceDetails } from '../interfaces/DeviceDetails.interface';

export const DeviceDetailsModel = DeviceDetails.init(
	{
		id: {
			primaryKey: true,
			type: DataType.INTEGER.UNSIGNED,
			autoIncrement: true,
		},
		deviceKey: {
			type: DataType.STRING(128),
			allowNull: true,
			unique: true,
		},
		deviceName: {
			type: DataType.STRING(128),
			allowNull: true,
		},
		deviceImage: {
			type: DataType.STRING(128),
			allowNull: true,
		},
		connectivity: {
			type: DataType.STRING(128),
			allowNull: true,
		},
		launchDate: {
			type: DataType.STRING(128),
			allowNull: true,
		},
		dimensions: {
			type: DataType.STRING(128),
			allowNull: true,
		},
		weight: {
			type: DataType.STRING(128),
			allowNull: true,
		},
		build: {
			type: DataType.STRING(128),
			allowNull: true,
		},
		sim: {
			type: DataType.STRING(128),
			allowNull: true,
		},
		display: {
			type: DataType.STRING(128),
			allowNull: true,
		},
		size: {
			type: DataType.STRING(128),
			allowNull: true,
		},
		resolution: {
			type: DataType.STRING(128),
			allowNull: true,
		},
		protection: {
			type: DataType.STRING(128),
			allowNull: true,
		},
		os: {
			type: DataType.STRING(128),
			allowNull: true,
		},
		chipset: {
			type: DataType.STRING(128),
			allowNull: true,
		},
		cpu: {
			type: DataType.STRING(128),
			allowNull: true,
		},
		gpu: {
			type: DataType.STRING(128),
			allowNull: true,
		},
		cardSlot: {
			type: DataType.STRING(128),
			allowNull: true,
		},
		internalStorage: {
			type: DataType.STRING(128),
			allowNull: true,
		},
		cameraMain: {
			type: DataType.STRING(128),
			allowNull: true,
		},
		videoMain: {
			type: DataType.STRING(128),
			allowNull: true,
		},
		cameraSelfie: {
			type: DataType.STRING(128),
			allowNull: true,
		},
		videoSelfie: {
			type: DataType.STRING(128),
			allowNull: true,
		},
		speakers: {
			type: DataType.STRING(128),
			allowNull: true,
		},
		jack: {
			type: DataType.STRING(128),
			allowNull: true,
		},
		features: {
			type: DataType.STRING(128),
			allowNull: true,
		},
		batteryType: {
			type: DataType.STRING(128),
			allowNull: true,
		},
		batteryCharge: {
			type: DataType.STRING(128),
			allowNull: true,
		},
		price: {
			type: DataType.STRING(128),
			allowNull: true,
		},
	},
	{ sequelize, timestamps: false }
);
