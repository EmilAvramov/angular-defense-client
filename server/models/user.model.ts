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
		type: DataType.CHAR,
		allowNull: false,
	},
	password: {
		type: DataType.CHAR,
		allowNull: false,
	},
	firstName: {
		type: DataType.CHAR,
		allowNull: false,
	},
	lastName: {
		type: DataType.CHAR,
		allowNull: false,
	},
	phone: {
		type: DataType.BIGINT,
		allowNull: false,
	},
	address: {
		type: DataType.CHAR,
		allowNull: false,
	},
	city: {
		type: DataType.CHAR,
		allowNull: false,
	},
});

(async () => await database.sequelize.sync())()