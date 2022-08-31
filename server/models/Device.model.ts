import { DataType } from "sequelize-typescript";
import database from "../config/database";
import { Device } from "../interfaces/Device.interface";
import { BrandModel } from "./Brand.model";
import { DeviceDetailsModel } from "./DeviceDetails.model";

export const DeviceModel = database.sequelize.define<Device>(
	'Device',
	{
		deviceId: {
			primaryKey: true,
			type: DataType.INTEGER,
			allowNull: false,
			autoIncrement: false,
			unique: true,
		},
		deviceName: {
			type: DataType.TEXT,
			allowNull: false,
		},
		deviceType: {
			type: DataType.TEXT,
			allowNull: false,
		},
		deviceImage: {
			type: DataType.TEXT,
			allowNull: false,
		},
		deviceKey: {
			type: DataType.TEXT,
			allowNull: true,
			unique: true,
		},
		fkBrand: {
			type: DataType.INTEGER,
			allowNull: false,
			unique: false,
		},
	},
	{ timestamps: false }
);

DeviceModel.belongsTo(BrandModel, {
	targetKey: 'brandId',
	foreignKey: 'fkBrand',
});

DeviceModel.hasOne(DeviceDetailsModel, {
	foreignKey: 'deviceKey',
});

(async () => await database.sequelize.sync())();
