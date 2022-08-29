import {
	DeviceDetailsModel,
	DevicePostingModel,
} from '../models/database.model';
import { UserModel } from '../models/user.model';
import { Op } from 'sequelize';
import { DevicePosting } from '../interfaces/DevicePosting.interface';

export const getAllPostings = async () => {
	try {
		return await DevicePostingModel.findAll({
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
		return await DevicePostingModel.findAll({
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

export const createPosting = async (payload: DevicePosting) => {
	try {
		return await DevicePostingModel.create({
			userId: payload.userId,
			deviceId: payload.deviceId,
			comments: payload.comments,
            price: payload.price
		});
	} catch (err: any) {
		throw new Error(err.message);
	}
};

export const editPosting = async (payload: DevicePosting) => {
	try {
		return await DevicePostingModel.update(
			{ comments: payload.comments },
			{ where: { id: payload.id } }
		);
	} catch (err: any) {
		throw new Error(err.message);
	}
};

export const deletePosting = async (id: number) => {
	try {
		return await DevicePostingModel.destroy({ where: { id: id } });
	} catch (err: any) {
		throw new Error(err.message);
	}
};
