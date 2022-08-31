import axios from 'axios';
import { apiHost } from '../config/settings';
import { Device } from '../interfaces/Device.interface';
import fs from 'fs';
import path from 'path';
import { DeviceDetails } from '../interfaces/DeviceDetails.interface';
import { Brand } from '../interfaces/Brand.interface';
import { BrandModel } from '../models/Brand.model';
import { DeviceModel } from '../models/Device.model';
import { DeviceDetailsModel } from '../models/DeviceDetails.model';
import { normalize } from './functions';

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
		await BrandModel.bulkCreate<Brand>(normalized);
	} catch (err: any) {
		throw new Error(err.message);
	}
};

export const getDevices = async () => {
	const aggregatedList: any[] = [];
	let raw: any[] = [];

	fs.readFile(
		path.resolve(__dirname, './rawData/device_list.json'),
		async (err, data) => {
			if (err) {
				throw new Error('failed to read data');
			}
			raw = JSON.parse(data.toString()).data;
			raw.forEach((item: any) => {
				item.device_list.forEach((device: any) => {
					aggregatedList.push({
						deviceId: device.device_id,
						deviceName: device.device_name,
						deviceType: device.device_type,
						deviceImage: device.device_image,
						deviceKey: device.key,
						fkBrand: item.brand_id,
					});
				});
			});
			try {
				await DeviceModel.bulkCreate<Device>(aggregatedList);
			} catch (err: any) {
				console.log(err.message);
			}
		}
	);
};

export const readyData = async () => {
	const aggregatedDetails: any[] = [];
	let raw: any[] = [];

	fs.readFile(
		path.resolve(__dirname, './rawData/device_data.json'),
		async (err, data) => {
			if (err) {
				throw new Error('failed to read data');
			}
			raw = JSON.parse(data.toString());
			raw.forEach((item: any) => {
				if (item.data?.key !== undefined) {
					aggregatedDetails.push(normalize(item));
				}
			});
			try {
				await DeviceDetailsModel.bulkCreate<DeviceDetails>(aggregatedDetails);
			} catch (err: any) {
				console.log(err.stack);
			}
		}
	);
};
