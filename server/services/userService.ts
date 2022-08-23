import { User } from "../models/user.model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { saltRounds } from "../config/settings";
import { UserModel } from "../interfaces/User.interface";

const jwtSecret = process.env['NG_APP_SECRET'];
const blackList = new Set();

const createSession = (user: UserModel) => {
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

	const accessToken = jwt.sign(payload, jwtSecret!, {
		expiresIn: '2d'
	})

	return {
		payload,
		accessToken
	};
};

export const register = async (data: UserModel) => {
	const exists = await User.findOne({ where: { email: data.email } });

	if (exists) {
		throw new Error('Email is already taken');
	}

	const hashedPassword = await bcrypt.hash(data.password, saltRounds);
	const user = await User.create({
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

export const login = async (data: UserModel) => {
	const user = await User.findOne({ where: { email: data.email } });

	if (!user) {
		throw new Error('Incorrect credentials');
	}

	const matchPassword = await bcrypt.compare(data.password, user.password);

	if (!matchPassword) {
		throw new Error('Incorrect credentials');
	}

	return createSession(user);
};

export const validateToken = (token: any) => {
	if (blackList.has(token)) {
		throw new Error('Token is blacklisted');
	}
	return jwt.verify(token, jwtSecret!);
};

export const logout = (token: any) => {
	blackList.add(token);
};
