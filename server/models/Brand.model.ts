import { DataType } from "sequelize-typescript";
import database from "../config/database";
import { Brand } from "../interfaces/Brand.interface";
import { DeviceModel } from "./Device.model";

export const BrandModel = database.sequelize.define<Brand>(
	'Brand',
	{
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
	},
	{ timestamps: false }
);

BrandModel.hasMany(DeviceModel, { foreignKey: 'fkBrand' });

(async () => await database.sequelize.sync())();
