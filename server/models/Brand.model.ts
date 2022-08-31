import { DataType } from 'sequelize-typescript';
import sequelize from '../config/database';
import { Brand } from '../interfaces/Brand.interface';

export const BrandModel = Brand.init(
	{
		brandId: {
			type: DataType.INTEGER,
			autoIncrement: false,
			primaryKey: true,
			unique: true,
			allowNull: false,
		},
		brandKey: {
			type: DataType.STRING(128),
			allowNull: false,
		},
		brandName: {
			type: DataType.STRING(128),
			allowNull: false,
		},
	},
	{
		sequelize, timestamps: false
	}
);
