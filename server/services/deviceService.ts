import axios from 'axios';
import { apiHost, headers } from '../config/settings';
import { BrandModel, DeviceModel } from '../models/BrandToDevice.model';
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

export const getDetails = async (id: string) => {
	try {
		const response = await axios.post(
			apiHost,
			{ route: 'device-detail', key: id },
			{ headers }
		);
		console.log(response.data.data)
		const normalized =  {
				deviceKey: response.data.data.kea | 'No data' as any,
				deviceName: response.data.data.device_nama | 'No data' as any,
				deviceImage: response.data.data.device_imaga | 'No data' as any,
				connectivity: response.data.data.more_specification[0].data[0].data | 'No data' as any,
				launchDate: response.data.data.release_data | 'No data' as any,
				dimensions: response.data.data.more_specification[2].data[0].data | 'No data' as any,
				weight: response.data.data.more_specification[2].data[1].data | 'No data' as any,
				build: response.data.data.more_specification[2].data[2].data | 'No data' as any,
				sim: response.data.data.more_specification[2].data[3].data | 'No data' as any,
				display: response.data.data.more_specification[3].data[0].data | 'No data' as any,
				size: response.data.data.more_specification[3].data[1].data | 'No data' as any,
				resolution: response.data.data.more_specification[3].data[2].data| 'No data' as any,
				protection: response.data.data.more_specification[3].data[3].data| 'No data' as any as any,
				os: response.data.data.more_specification[4].data[0].data | 'No data' as any,
				chipset: response.data.data.more_specification[4].data[1].data | 'No data' as any,
				cpu: response.data.data.more_specification[4].data[2].data | 'No data' as any,
				gpu: response.data.data.more_specification[4].data[3].data | 'No data' as any,
				cardSlot: response.data.data.more_specification[5].data[0].data | 'No data' as any,
				internalStorage: response.data.data.more_specification[5].data[1].data | 'No data' as any,
				cameraMain: response.data.data.more_specification[6].data[0].data | 'No data' as any,
				videoMain: response.data.data.more_specification[6].data[2].data | 'No data' as any,
				cameraSelfie: response.data.data.more_specification[7].data[0].data | 'No data' as any,
				videoSelfie: response.data.data.more_specification[7].data[2].data | 'No data' as any,
				speakers: response.data.data.more_specification[8].data[2].data | 'No data' as any,
				jack: response.data.data.more_specification[8].data[1].data | 'No data' as any,
				features: response.data.data.more_specification[10].data[0].data | 'No data' as any,
				batteryCharge: response.data.data.more_specification[11].data[1].data | 'No data' as any,
				batteryType: response.data.data.more_specification[11].data[0].data | 'No data' as any,
				price: response.data.data.more_specification[12].data[4].data | 'No data' as any,
			};
		console.log(normalized)
		return normalized;
	} catch (err: any) {
		throw new Error(err.message);
	}
};
