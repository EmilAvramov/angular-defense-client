import { Sequelize } from 'sequelize';
import { environment } from 'src/environments/environment';

export const db = new Sequelize(
	environment.database,
	environment.username,
	environment.password,
	{
		host: environment.host,
		port: Number(environment.port),
		dialect: 'postgres',
	}
);
