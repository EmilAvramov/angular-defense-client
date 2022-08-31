import { DataTypes } from 'sequelize/types';
import sequelize from '../config/database';
import { Brand } from '../interfaces/Brand.interface';

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
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		brandName: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
	},
	{
		sequelize,
	}
);
