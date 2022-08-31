import { DataType } from "sequelize-typescript";
import database from "../config/database";
import { DeviceDetails } from "../interfaces/DeviceDetails.interface";
import { DeviceModel } from "./Device.model";

export const DeviceDetailsModel = database.sequelize.define<DeviceDetails>(
	'Details',
	{
		id: {
			primaryKey: true,
			type: DataType.INTEGER,
			autoIncrement: true,
		},
		deviceKey: {
			type: DataType.TEXT,
			allowNull: true,
			unique: true,
		},
		deviceName: {
			type: DataType.TEXT,
			allowNull: true,
		},
		deviceImage: {
			type: DataType.TEXT,
			allowNull: true,
		},
		connectivity: {
			type: DataType.TEXT,
			allowNull: true,
		},
		launchDate: {
			type: DataType.TEXT,
			allowNull: true,
		},
		dimensions: {
			type: DataType.TEXT,
			allowNull: true,
		},
		weight: {
			type: DataType.TEXT,
			allowNull: true,
		},
		build: {
			type: DataType.TEXT,
			allowNull: true,
		},
		sim: {
			type: DataType.TEXT,
			allowNull: true,
		},
		display: {
			type: DataType.TEXT,
			allowNull: true,
		},
		size: {
			type: DataType.TEXT,
			allowNull: true,
		},
		resolution: {
			type: DataType.TEXT,
			allowNull: true,
		},
		protection: {
			type: DataType.TEXT,
			allowNull: true,
		},
		os: {
			type: DataType.TEXT,
			allowNull: true,
		},
		chipset: {
			type: DataType.TEXT,
			allowNull: true,
		},
		cpu: {
			type: DataType.TEXT,
			allowNull: true,
		},
		gpu: {
			type: DataType.TEXT,
			allowNull: true,
		},
		cardSlot: {
			type: DataType.TEXT,
			allowNull: true,
		},
		internalStorage: {
			type: DataType.TEXT,
			allowNull: true,
		},
		cameraMain: {
			type: DataType.TEXT,
			allowNull: true,
		},
		videoMain: {
			type: DataType.TEXT,
			allowNull: true,
		},
		cameraSelfie: {
			type: DataType.TEXT,
			allowNull: true,
		},
		videoSelfie: {
			type: DataType.TEXT,
			allowNull: true,
		},
		speakers: {
			type: DataType.TEXT,
			allowNull: true,
		},
		jack: {
			type: DataType.TEXT,
			allowNull: true,
		},
		features: {
			type: DataType.TEXT,
			allowNull: true,
		},
		batteryType: {
			type: DataType.TEXT,
			allowNull: true,
		},
		batteryCharge: {
			type: DataType.TEXT,
			allowNull: true,
		},
		price: {
			type: DataType.TEXT,
			allowNull: true,
		},
	},
	{ timestamps: false }
);

DeviceDetailsModel.belongsTo(DeviceModel, {
	targetKey: 'deviceKey',
	foreignKey: 'deviceKey',
});

(async () => await database.sequelize.sync())();
