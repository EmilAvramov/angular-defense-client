import axios from 'axios';
import { apiHost, headers } from '../config/settings';
import { Op } from 'sequelize';
import { BrandModel } from '../models/Brand.model';
import { DeviceModel } from '../models/Device.model';
import { DeviceDetailsModel } from '../models/DeviceDetails.model';

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