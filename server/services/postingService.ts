import e from 'express';
import { Op } from 'sequelize';
import { Posting } from '../interfaces/Posting.interface';
import { PostingModel, UserModel, DeviceDetailsModel } from '../models/models';

export const getPostings = async (
	query: string = '',
	limit: number = 100,
	offset: number = 0
) => {
	try {
		if (query) {
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
				limit,
				offset,
			});
		}
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
			limit,
			offset,
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

export const editPosting = async (
	id: number,
	comments: string | undefined,
	price: number | undefined
) => {
	try {
		if (comments && price) {
			return await PostingModel.update({ comments, price }, { where: { id } });
		} else if (comments && !price) {
			return await PostingModel.update({ comments }, { where: { id } });
		} else if (!comments && price) {
			return await PostingModel.update({ price }, { where: { id } });
		} else {
			throw new Error('No values provided');
		}
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
