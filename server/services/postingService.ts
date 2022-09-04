import { Op } from 'sequelize';
import { Posting } from '../interfaces/Posting.interface';
import {
	PostingModel,
	UserModel,
	DeviceDetailsModel,
	DeviceModel,
} from '../models/models';

export const getAllPostings = async () => {
	try {
		return await PostingModel.findAll({
			include: [
				{
					model: UserModel,
					required: true,
				},
				{
					model: DeviceDetailsModel,
					required: true,
				},
			],
		});
	} catch (err: any) {
		throw new Error(err.message);
	}
};

export const getFilteredPostings = async (query: string) => {
	try {
		return await PostingModel.findAll({
			include: [
				{
					model: DeviceDetailsModel,
					where: { deviceName: { [Op.iLike]: `%${query}%` } },
					required: true,
				},
				{
					model: UserModel,
					required: true,
				},
			],
		});
	} catch (err: any) {
		throw new Error(err.message);
	}
};

export const loadDetails = async (query: string, limit: number = 100) => {
	try {
		return await DeviceModel.findAll({
			where: { deviceName: { [Op.iLike]: `%${query}%` } },
			limit,
		});
	} catch (err: any) {
		throw new Error(err.message);
	}
};

export const createPosting = async (payload: Posting) => {
	try {
		return await PostingModel.create(payload);
	} catch (err: any) {
		throw new Error(err.message);
	}
};

export const editPosting = async (payload: Posting) => {
	try {
		return await PostingModel.update(
			{ comments: payload.comments, price: payload.price },
			{ where: { id: payload.id } }
		);
	} catch (err: any) {
		throw new Error(err.message);
	}
};

export const deletePosting = async (id: number) => {
	try {
		return await PostingModel.destroy({ where: { id: id } });
	} catch (err: any) {
		throw new Error(err.message);
	}
};
