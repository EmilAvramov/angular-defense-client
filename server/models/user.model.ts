// import { DataTypes } from 'sequelize'
const { DataTypes } = require('sequelize');
const db = require('../config/database');

export const User = db.define('User', {
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	phone: {
		type: DataTypes.NUMBER,
		allowNull: false,
	},
	address: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	city: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})(async () => {
	await db.sync();
})();
