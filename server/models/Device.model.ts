import sequelize from '../config/database';
import { Device } from '../interfaces/Device.interface';
import { DataTypes } from 'sequelize'

export const DeviceModel = Device.init(
	{
		deviceId: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: false,
			unique: true,
		},
		deviceName: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		deviceType: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		deviceImage: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		deviceKey: {
			type: DataTypes.STRING(128),
			allowNull: true,
			unique: true,
		},
		fkBrand: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: false,
		},
	},
	{ sequelize, timestamps: false }
);

DeviceModel.sync()