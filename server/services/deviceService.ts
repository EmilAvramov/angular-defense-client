import { Op } from 'sequelize';
import { DeviceModel } from '../models/models';

export const getDevices = async (
	query: string = '',
	limit: number = 100,
	offset: number = 0
) => {
	try {
		if (query) {
			return await DeviceModel.findAll({
				where: { deviceName: { [Op.iLike]: `%${query}%` } },
				limit,
				offset,
				include: {
					all: true,
				},
			});
		}
		return await DeviceModel.findAll({
			limit,
			offset,
			include: {
				all: true,
			},
		});
	} catch (err: any) {
		throw new Error(err.message);
	}
};
