import axios from 'axios';
import { apiHost } from '../config/settings';
import { Brand } from '../interfaces/Device.interface';
import { BrandModel } from '../models/BrandToDevice.model';

export const getData = async () => {
	try {
		let response = await axios.get(`${apiHost}?route=device-list`);
		let normalized = response.data.data.map((item: any) => {
			return {
				brandId: item.brand_id,
				brandName: item.brand_name,
				brandKey: item.key,
			};
		});
		await BrandModel.bulkCreate<Brand>(normalized, {
			fields: ['brandId', 'brandName', 'brandKey'],
			updateOnDuplicate: ['brandName', 'brandKey'],
			returning: true,
		});
	} catch (err: any) {
		throw new Error(err.message);
	}
};
