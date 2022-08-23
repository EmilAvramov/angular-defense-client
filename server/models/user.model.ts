import database from '../config/database';
import { DataType } from 'sequelize-typescript';
import { UserModel } from '../interfaces/User.interface';

export const User = database.sequelize.define<UserModel>('User', {
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

(async () => await database.sequelize.sync())()