import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { DeviceDetails } from '../interfaces/DeviceDetails.interface';

export const DeviceDetailsModel = DeviceDetails.init(
	{
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true,
		},
		deviceKey: {
			type: DataTypes.STRING(128),
			allowNull: true,
			unique: true,
		},
		deviceName: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		deviceImage: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		connectivity: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		launchDate: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		dimensions: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		weight: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		build: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		sim: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		display: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		size: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		resolution: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		protection: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		os: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		chipset: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		cpu: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		gpu: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		cardSlot: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		internalStorage: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		cameraMain: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		videoMain: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		cameraSelfie: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		videoSelfie: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		speakers: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		jack: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		features: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		batteryType: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		batteryCharge: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		price: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
	},
	{ sequelize, timestamps: false }
);

DeviceDetailsModel.sync()