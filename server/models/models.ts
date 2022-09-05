import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

import { Brand } from '../interfaces/Brand.interface';
import { Device } from '../interfaces/Device.interface';
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
			type: DataTypes.TEXT,
			allowNull: false,
			unique: true
		},
		brandName: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
	},
	{
		sequelize,
		timestamps: false,
	}
);

export const DeviceModel = Device.init(
	{
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true,
		},
		deviceKey: {
			type: DataTypes.TEXT,
			allowNull: false,
			unique: true,
		},
		deviceName: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		deviceImage: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		connectivity: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		launchDate: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		dimensions: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		weight: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		build: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		sim: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		display: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		size: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		resolution: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		protection: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		os: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		chipset: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		cpu: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		gpu: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		cardSlot: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		internalStorage: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		cameraMain: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		videoMain: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		cameraSelfie: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		videoSelfie: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		speakers: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		jack: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		features: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		batteryType: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		batteryCharge: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		price: {
			type: DataTypes.TEXT,
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
			type: DataTypes.TEXT,
			unique: false,
			allowNull: false,
		},
		deviceKey: {
			type: DataTypes.TEXT,
			unique: false,
			allowNull: false,
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
			type: DataTypes.TEXT,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		firstName: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		phone: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		address: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		city: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},
	{ sequelize, timestamps: false }
);

DeviceModel.hasMany(PostingModel, {
	sourceKey: 'deviceKey',
	foreignKey: 'deviceKey'
})

UserModel.hasMany(PostingModel, {
	sourceKey: 'email',
	foreignKey: 'userEmail',
});

PostingModel.belongsTo(DeviceModel, {
	foreignKey: 'deviceKey',
	targetKey: 'deviceKey',
});

PostingModel.belongsTo(UserModel, {
	foreignKey: 'userEmail',
	targetKey: 'email',
});

(async () => {
	await sequelize.sync();
})();
