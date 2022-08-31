import sequelize from '../config/database';
import { DataType } from 'sequelize-typescript';
import { User } from '../interfaces/User.interface';

export const UserModel = User.init(
	{
		id: {
			primaryKey: true,
			type: DataType.INTEGER.UNSIGNED,
			autoIncrement: true,
		},
		email: {
			type: DataType.STRING(128),
			allowNull: false,
		},
		password: {
			type: DataType.STRING(128),
			allowNull: false,
		},
		firstName: {
			type: DataType.STRING(128),
			allowNull: false,
		},
		lastName: {
			type: DataType.STRING(128),
			allowNull: false,
		},
		phone: {
			type: DataType.STRING(128),
			allowNull: false,
		},
		address: {
			type: DataType.STRING(128),
			allowNull: false,
		},
		city: {
			type: DataType.STRING(128),
			allowNull: false,
		},
	},
	{ sequelize, timestamps: false }
);

UserModel.sync();
