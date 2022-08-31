import { Op } from 'sequelize';
import { DeviceModel, BrandModel, DeviceDetailsModel } from '../models/models';

export const getList = async (
	query: string = '',
	limit: number = 100,
	offset: number = 0
) => {
	try {
		if (query) {
			return await DeviceModel.findAll({
				where: { deviceName: { [Op.iLike]: `%${query}%` } },
				limit,
				include: {
					model: BrandModel,
					required: true,
				},
			});
		}
		return await DeviceModel.findAll({
			limit,
			offset,
			include: {
				model: BrandModel,
				required: true,
			},
		});
	} catch (err: any) {
		throw new Error(err.message);
	}
};

export const getListWithDetails = async () => {
	try {
		return await DeviceDetailsModel.findAll()
	} catch (err:any) {
		throw new Error(err.message)
	}
}