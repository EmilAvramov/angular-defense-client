import axios from 'axios';
import { apiHost } from '../config/settings';
import { Brand, Device } from '../interfaces/Device.interface';
import { BrandModel, DeviceModel } from '../models/BrandToDevice.model';

export const getBrands = async () => {
	try {
		const response = await axios.get(`${apiHost}?route=device-list`);
		const normalized = response.data.data.map((item: any) => {
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

//
// deviceId: number;
// deviceName: string;
// deviceType: string;
// deviceImage: string;
// deviceKey: string;
// //

export const getDevices = async () => {
	try {
		const response = await axios.get(`${apiHost}?route=device-list`);
		const normalized:any[] = [];
		response.data.data.map((item: any) => {
			item.device_list.map((device: any) => {
				normalized.push({
					deviceId: device.device_id,
					deviceName: device.device_name,
					deviceType: device.device_type,
					deviceImage: device.device_image,
					deviceKey: device.key,
				});
			});
		});
		await DeviceModel.bulkCreate<Device>(normalized, {
			fields: ['deviceId', 'deviceName', 'deviceType', 'deviceImage', 'deviceKey'],
			updateOnDuplicate: ['deviceName', 'deviceType', 'deviceImage', 'deviceKey'],
			returning: true,
		});
	} catch (err: any) {
		throw new Error(err.message);
	}
};
