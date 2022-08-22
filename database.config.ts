import { Sequelize } from 'sequelize';

export const db = new Sequelize(
	process.env['NG_APP_DB']!,
	process.env['NG_APP_USERNAME']!,
	process.env['NG_APP_PASSWORD'],
	{
		host: process.env['NG_APP_HOST'],
		port: Number(process.env['NG_APP_PORT']),
		dialect: 'postgres',
	}
);
