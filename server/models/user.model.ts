import sequelize from '../config/database';
import { DataTypes } from 'sequelize';
import { User } from '../interfaces/User.interface';

export const UserModel = User.init(
	{
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true,
		},
		email: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		firstName: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		address: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		city: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
	},
	{ sequelize, timestamps: false }
);

UserModel.sync();
