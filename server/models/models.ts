import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

import { Brand } from '../interfaces/Brand.interface';
import { Device } from '../interfaces/Device.interface';
import { DeviceDetails } from '../interfaces/DeviceDetails.interface';
import { Posting } from '../interfaces/Posting.interface';
import { User } from '../interfaces/User.interface';

export const BrandModel = Brand.init(
	{
		brandId: {
			type: DataTypes.INTEGER,
			autoIncrement: false,
			primaryKey: true,
			unique: true,
			allowNull: false,
		},
		brandKey: {
			type: DataTypes.STRING(256),
			allowNull: false,
		},
		brandName: {
			type: DataTypes.STRING(256),
			allowNull: false,
		},
	},
	{
		sequelize,
		timestamps: false,
	}
);

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
			type: DataTypes.STRING(256),
			allowNull: false,
		},
		deviceType: {
			type: DataTypes.STRING(256),
			allowNull: false,
		},
		deviceImage: {
			type: DataTypes.STRING(256),
			allowNull: false,
		},
		deviceKey: {
			type: DataTypes.STRING(256),
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

export const DeviceDetailsModel = DeviceDetails.init(
	{
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true,
		},
		deviceKey: {
			type: DataTypes.STRING(256),
			allowNull: true,
			unique: true,
		},
		deviceName: {
			type: DataTypes.STRING(256),
			allowNull: true,
		},
		deviceImage: {
			type: DataTypes.STRING(256),
			allowNull: true,
		},
		connectivity: {
			type: DataTypes.STRING(256),
			allowNull: true,
		},
		launchDate: {
			type: DataTypes.STRING(256),
			allowNull: true,
		},
		dimensions: {
			type: DataTypes.STRING(256),
			allowNull: true,
		},
		weight: {
			type: DataTypes.STRING(256),
			allowNull: true,
		},
		build: {
			type: DataTypes.STRING(256),
			allowNull: true,
		},
		sim: {
			type: DataTypes.STRING(256),
			allowNull: true,
		},
		display: {
			type: DataTypes.STRING(256),
			allowNull: true,
		},
		size: {
			type: DataTypes.STRING(256),
			allowNull: true,
		},
		resolution: {
			type: DataTypes.STRING(256),
			allowNull: true,
		},
		protection: {
			type: DataTypes.STRING(256),
			allowNull: true,
		},
		os: {
			type: DataTypes.STRING(256),
			allowNull: true,
		},
		chipset: {
			type: DataTypes.STRING(256),
			allowNull: true,
		},
		cpu: {
			type: DataTypes.STRING(256),
			allowNull: true,
		},
		gpu: {
			type: DataTypes.STRING(256),
			allowNull: true,
		},
		cardSlot: {
			type: DataTypes.STRING(256),
			allowNull: true,
		},
		internalStorage: {
			type: DataTypes.STRING(256),
			allowNull: true,
		},
		cameraMain: {
			type: DataTypes.STRING(256),
			allowNull: true,
		},
		videoMain: {
			type: DataTypes.STRING(256),
			allowNull: true,
		},
		cameraSelfie: {
			type: DataTypes.STRING(256),
			allowNull: true,
		},
		videoSelfie: {
			type: DataTypes.STRING(256),
			allowNull: true,
		},
		speakers: {
			type: DataTypes.STRING(256),
			allowNull: true,
		},
		jack: {
			type: DataTypes.STRING(256),
			allowNull: true,
		},
		features: {
			type: DataTypes.STRING(256),
			allowNull: true,
		},
		batteryType: {
			type: DataTypes.STRING(256),
			allowNull: true,
		},
		batteryCharge: {
			type: DataTypes.STRING(256),
			allowNull: true,
		},
		price: {
			type: DataTypes.STRING(256),
			allowNull: true,
		},
	},
	{ sequelize, timestamps: false }
);

export const PostingModel = Posting.init(
	{
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true,
		},
		userEmail: {
			type: DataTypes.STRING(256),
			unique: true,
		},
		deviceKey: {
			type: DataTypes.STRING(256),
			unique: true,
		},
		comments: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		price: {
			type: DataTypes.DECIMAL,
			allowNull: false,
		},
	},
	{ sequelize, timestamps: false }
);

export const UserModel = User.init(
	{
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true,
		},
		email: {
			type: DataTypes.STRING(256),
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING(256),
			allowNull: false,
		},
		firstName: {
			type: DataTypes.STRING(256),
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING(256),
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING(256),
			allowNull: false,
		},
		address: {
			type: DataTypes.STRING(256),
			allowNull: false,
		},
		city: {
			type: DataTypes.STRING(256),
			allowNull: false,
		},
	},
	{ sequelize, timestamps: false }
);

BrandModel.hasMany(DeviceModel, {
	sourceKey: 'brandId',
	foreignKey: 'fkBrand',
});

DeviceModel.belongsTo(BrandModel, {
	foreignKey: 'fkBrand',
	targetKey: 'brandId',
});

DeviceModel.hasOne(DeviceDetailsModel, {
	foreignKey: 'deviceKey',
	sourceKey: 'deviceKey',
});

DeviceDetailsModel.hasOne(DeviceModel, {
	sourceKey: 'deviceKey',
	foreignKey: 'deviceKey',
});

PostingModel.hasOne(DeviceDetailsModel, {
	foreignKey: 'deviceKey',
	sourceKey: 'deviceKey',
});

DeviceDetailsModel.hasMany(PostingModel, {
	sourceKey: 'deviceKey',
	foreignKey: 'deviceKey',
});

PostingModel.belongsTo(UserModel, {
	foreignKey: 'userEmail',
	targetKey: 'email',
});

UserModel.hasMany(PostingModel, {
	sourceKey: 'email',
	foreignKey: 'userEmail',
});

(async () => {
	await sequelize.sync();
})();
