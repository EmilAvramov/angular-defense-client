const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = require('../config/settings');

const jwtSecret = process.env['NG_APP_SECRET'];
const blackList = new Set();

export const register = async (data: any) => {
	const exists = await User.findOne({where: {email: data.email}})

	const hashedPassword = await bcrypt.hash(data.password, salt.saltRounds);
	await User.create({
		email: data.email,
		password: hashedPassword,
		name: data.firstName + ' ' + data.lastName,
		phone: data.phone,
		address: data.address,
		city: data.city,
	});
};
