import { DataType } from 'sequelize-typescript';
import sequelize from '../config/database';
import { Posting } from '../interfaces/Posting.interface';

export const PostingModel = Posting.init(
	{
		id: {
			primaryKey: true,
			type: DataType.INTEGER.UNSIGNED,
			autoIncrement: true,
		},
		userEmail: {
			type: DataType.STRING(128),
		},
		deviceKey: {
			type: DataType.STRING(128),
		},
		comments: {
			type: DataType.TEXT,
			allowNull: true,
		},
		price: {
			type: DataType.DECIMAL,
			allowNull: false,
		},
	},
	{ sequelize, timestamps: false,  }
);