import database from '../config/database';
import { DataType } from 'sequelize-typescript';
import { Brand, Device } from '../interfaces/Device.interface';

export const BrandModel = database.sequelize.define<Brand>('Brand', {
	brandId: {
		primaryKey: true,
		type: DataType.INTEGER,
		allowNull: false,
		autoIncrement: false,
		unique: true,
	},
	brandName: {
		type: DataType.TEXT,
		allowNull: false,
	},
	brandKey: {
		type: DataType.TEXT,
		allowNull: false,
		unique: true,
	},
});

export const DeviceModel = database.sequelize.define<Device>('Device', {
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
		allowNull: false,
		unique: true,
	},
	fkBrand: {
		type: DataType.INTEGER,
		allowNull: false,
		references: {
			model: BrandModel,
			key: 'brandId'
		}
	},
});

(async () => await database.sequelize.sync())();