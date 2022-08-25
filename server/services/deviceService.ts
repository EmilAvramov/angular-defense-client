import axios from 'axios';
import { apiHost, headers } from '../config/settings';
import { DeviceModel } from '../models/BrandToDevice.model';
import { Op } from 'sequelize';

export const getNews = async (query: string) => {
	try {
		const response = await axios.post(
			apiHost,
			{
				route: 'search',
				query,
			},
			{ headers }
		);
		const news = response.data.data.news_list;
		const reviews = response.data.data.review_list;
		const status = response.data.status;
		return { news, reviews, status };
	} catch (err: any) {
		throw new Error(err.message);
	}
};

export const getList = async (query: string) => {
	try {
		return await DeviceModel.findAll({
			where: { deviceName: { [Op.iLike]: `%${query}%` } },
			limit: 10,
		});
	} catch (err: any) {
		throw new Error(err.message);
	}
};

export const getDetails = async (id: string) => {
	try {
		return await axios.post(
			apiHost,
			{ route: 'device-detail', key: id },
			{ headers }
		);
	} catch (err: any) {
		throw new Error(err.message);
	}
};
