import database from '../config/database';
import { DataType, PrimaryKey } from 'sequelize-typescript';
import { Brand, Device } from '../interfaces/Device.interface';

export const BrandModel = database.sequelize.define<Brand>('Brand', {
	brandId: {
		primaryKey: true,
		type: DataType.INTEGER,
		allowNull: false,
		autoIncrement: false,
	},
	brandName: {
		type: DataType.TEXT,
		allowNull: false,
	},
	key: {
		type: DataType.INTEGER,
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
	key: {
		type: DataType.INTEGER,
		allowNull: false,
		unique: true,
	},
});

BrandModel.hasMany(DeviceModel);
DeviceModel.belongsTo(BrandModel);

(async () => await database.sequelize.sync())();
