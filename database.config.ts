const pg = require('pg');
delete pg.native;

const Sequelize = require('sequelize');

export const connection = new Sequelize({
	database: 'mobispace',
	dialect: 'postgres',
	native: false,
	username: process.env['USERNAME'],
	password: process.env['PASSWORD'],
	host: process.env['HOST'],
	port: process.env['PORT'],
	dialectModule: pg,
	define: {
		timestamps: false
	},
	logging: false
})
