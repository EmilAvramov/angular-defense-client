const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const database = new Sequelize(
	process.env['NG_APP_DB'],
	process.env['NG_APP_USERNAME'],
	process.env['NG_APP_PASSWORD'],
	{
		host: process.env['NG_APP_HOST'],

		port: Number(process.env['NG_APP_PORT="5432"']),
		dialect: 'postgres',
	}
);

module.exports = database
