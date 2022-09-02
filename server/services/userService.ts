import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { saltRounds } from '../config/settings';
import { User } from '../interfaces/User.interface';
import { UserModel } from '../models/models';

const jwtSecret = process.env['NG_APP_SECRET'];
const blackList = new Set();

const createSession = (user: User) => {
	const payload = {
		id: user.id,
		email: user.email,
		password: user.password,
		firstName: user.firstName,
		lastName: user.lastName,
		phone: user.phone,
		address: user.address,
		city: user.city,
	};

	const token = jwt.sign(payload, jwtSecret as string, {
		expiresIn: '2d',
	});

	return {
		...payload,
		token,
	};
};

export const register = async (data: User) => {
	const exists = await UserModel.findOne({ where: { email: data.email } });

	if (exists) {
		throw new Error('Email is already taken');
	}

	const hashedPassword = await bcrypt.hash(data.password, saltRounds);
	const user = await UserModel.create({
		email: data.email,
		password: hashedPassword,
		firstName: data.firstName,
		lastName: data.lastName,
		phone: data.phone,
		address: data.address,
		city: data.city,
	});

	return createSession(user);
};

export const login = async (data: { email: string; password: string }) => {
	const user = await UserModel.findOne({ where: { email: data.email } });

	if (!user) {
		throw new Error('Incorrect credentials');
	}

	const matchPassword = await bcrypt.compare(data.password, user.password);

	if (!matchPassword) {
		throw new Error('Incorrect credentials');
	}

	return createSession(user);
};

export const validateToken = (token: string) => {
	if (blackList.has(token)) {
		throw new Error('Token is blacklisted');
	}
	return jwt.verify(token, jwtSecret!);
};

export const logout = (token: string) => {
	blackList.add(token);
};
