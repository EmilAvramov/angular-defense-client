import database from '../config/database';
import { DataType } from 'sequelize-typescript';
import { User } from '../interfaces/User.interface';

export const UserModel = database.sequelize.define<User>('User', {
	id: {
		primaryKey: true,
		type: DataType.INTEGER,
		autoIncrement: true
	},
	email: {
		type: DataType.TEXT,
		allowNull: false,
	},
	password: {
		type: DataType.TEXT,
		allowNull: false,
	},
	firstName: {
		type: DataType.TEXT,
		allowNull: false,
	},
	lastName: {
		type: DataType.TEXT,
		allowNull: false,
	},
	phone: {
		type: DataType.TEXT,
		allowNull: false,
	},
	address: {
		type: DataType.TEXT,
		allowNull: false,
	},
	city: {
		type: DataType.TEXT,
		allowNull: false,
	},
});

UserModel.sync()