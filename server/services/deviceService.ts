import axios from 'axios';
import { apiHost, headers } from '../config/settings';
import { BrandModel, DeviceDetailsModel, DeviceModel } from '../models/database.model';
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

export const getListWithDetails = async () => {
	try {
		return await DeviceDetailsModel.findAll()
	} catch (err:any) {
		throw new Error(err.message)
	}
}

export const getDetails = async (id: string) => {
	try {
		const response = await axios.post(
			apiHost,
			{ route: 'device-detail', key: id },
			{ headers }
		);

		const normalized = {
			deviceKey: response.data.data?.key,
			deviceName: response.data.data?.device_name,
			deviceImage: response.data.data?.device_image,
			connectivity: response.data.data?.more_specification[0]?.data[0]?.data[0],
			launchDate: response.data.data?.release_date,
			dimensions: response.data.data?.more_specification[2]?.data[0]?.data[0],
			weight: response.data.data?.more_specification[2]?.data[1]?.data[0],
			build: response.data.data?.more_specification[2]?.data[2]?.data[0],
			sim: response.data.data?.more_specification[2]?.data[3]?.data[0],
			display: response.data.data?.more_specification[3]?.data[0]?.data[0],
			size: response.data.data?.more_specification[3]?.data[1]?.data[0],
			resolution: response.data.data?.more_specification[3]?.data[2]?.data[0],
			protection: response.data.data?.more_specification[3]?.data[3]?.data[0],
			os: response.data.data?.more_specification[4]?.data[0]?.data[0],
			chipset: response.data.data?.more_specification[4]?.data[1]?.data[0],
			cpu: response.data.data?.more_specification[4]?.data[2]?.data[0],
			gpu: response.data.data?.more_specification[4]?.data[3]?.data[0],
			cardSlot: response.data.data?.more_specification[5]?.data[0]?.data[0],
			internalStorage: response.data.data?.more_specification[5]?.data[1]?.data[0],
			cameraMain: response.data.data?.more_specification[6]?.data[0]?.data[0],
			videoMain: response.data.data?.more_specification[6]?.data[2]?.data[0],
			cameraSelfie: response.data.data?.more_specification[7]?.data[0]?.data[0],
			videoSelfie: response.data.data?.more_specification[7]?.data[2]?.data[0],
			speakers: response.data.data?.more_specification[8]?.data[2]?.data[0],
			jack: response.data.data?.more_specification[8]?.data[1]?.data[0],
			features: response.data.data?.more_specification[10]?.data[0]?.data[0],
			batteryCharge: response.data.data?.more_specification[11]?.data[1]?.data[0],
			batteryType: response.data.data?.more_specification[11]?.data[0]?.data[0],
			price: response.data.data?.more_specification[12]?.data[4]?.data[0],
		};
		return normalized;
		
	} catch (err: any) {
		throw new Error(err.message);
	}
};
