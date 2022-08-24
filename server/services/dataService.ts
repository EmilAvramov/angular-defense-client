import axios from 'axios';
import { apiHost } from '../config/settings';
import { BrandModel } from '../models/BrandToDevice.model';

export const getData = async () => {
	try {
		const response = await axios.get(`${apiHost}?route=device-list`);
		for (let item of response.data.data) {
			console.log(item)
			const brand = await BrandModel.findOne({
				where: { brandId: item.brand_id },
			});
			if (!brand) {
				await BrandModel.create({
					brandId: item.brand_id,
					brandName: item.brand_name,
					brandKey: item.key,
				});
			}
		}
	} catch (err: any) {
		throw new Error(err.message);
	}
};
