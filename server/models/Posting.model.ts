import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Posting } from '../interfaces/Posting.interface';

export const PostingModel = Posting.init(
	{
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true,
		},
		userEmail: {
			type: DataTypes.STRING(128),
		},
		deviceKey: {
			type: DataTypes.STRING(128),
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
	{ sequelize, timestamps: false,  }
);

PostingModel.sync()