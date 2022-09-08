import { Op } from 'sequelize';
import { Posting } from '../interfaces/Posting.interface';
import { PostingModel, UserModel, DeviceModel } from '../models/models';

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
						model: DeviceModel,
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
					model: DeviceModel,
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

export const getUserPostings = async (id: number) => {
	try {
		return await PostingModel.findAll({
			include: [
				{
					model: UserModel,
					required: true,
					where: { id },
				},
				{
					model: DeviceModel,
					required: true,
				},
			],
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
		return await PostingModel.update({ comments, price }, { where: { id } });
	} catch (err: any) {
		throw new Error(err.message);
	}
};

export const deletePosting = async (id: number) => {
	try {
		const posting = await PostingModel.findByPk(id)
		await PostingModel.destroy({where: {id}})
		return posting
	} catch (err: any) {
		throw new Error(err.message);
	}
};
