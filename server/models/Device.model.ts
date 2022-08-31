import { DataType } from 'sequelize-typescript';
import sequelize from '../config/database';
import { Device } from '../interfaces/Device.interface';

export const DeviceModel = Device.init(
	{
		deviceId: {
			primaryKey: true,
			type: DataType.INTEGER,
			allowNull: false,
			autoIncrement: false,
			unique: true,
		},
		deviceName: {
			type: DataType.STRING(128),
			allowNull: false,
		},
		deviceType: {
			type: DataType.STRING(128),
			allowNull: false,
		},
		deviceImage: {
			type: DataType.STRING(128),
			allowNull: false,
		},
		deviceKey: {
			type: DataType.STRING(128),
			allowNull: true,
			unique: true,
		},
		fkBrand: {
			type: DataType.INTEGER,
			allowNull: false,
			unique: false,
		},
	},
	{ sequelize, timestamps: false }
);
