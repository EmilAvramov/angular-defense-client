import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

declare const process: {
	env: {
		NG_APP_DB: string;
		NG_APP_HOST: string;
		NG_APP_PORT: string;
		NG_APP_USERNAME: string;
		NG_APP_PASSWORD: string;
	};
};

const sequelize = new Sequelize(
	process.env['NG_APP_DB'],
	process.env['NG_APP_USERNAME'],
	process.env['NG_APP_PASSWORD'],
	{
		host: process.env['NG_APP_HOST'],
		port: Number(process.env['NG_APP_PORT']),
		dialect: 'postgres',
		logging: false,
	}
);

export default sequelize;
