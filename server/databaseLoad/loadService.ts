import fs from 'fs';
import path from 'path';

import { DeviceDetails } from '../interfaces/DeviceDetails.interface';
import { Brand } from '../interfaces/Brand.interface';
import { Device } from '../interfaces/Device.interface';
import { BrandModel, DeviceModel, DeviceDetailsModel } from '../models/models';

import { normalize } from './functions';

export const getBrands = async () => {
	const aggregatedBrands: any[] = [];
	let raw: any[] = [];

	fs.readFile(
		path.resolve(__dirname, './rawData/device_list.json'),
		async (err, data) => {
			if (err) {
				throw new Error('failed to read data');
			}
			raw = JSON.parse(data.toString()).data;
			raw.forEach((item: any) => {
				aggregatedBrands.push({
					brandId: item.brand_id,
					brandName: item.brand_name,
					brandKey: item.key,
				});
			});
			try {
				await BrandModel.bulkCreate<Brand>(aggregatedBrands);
			} catch (err: any) {
				console.log(err.message);
			}
		}
	);
};

export const cleanData = async () => {
	const deviceList: any[] = [];
	const deviceDetails: any[] = [];
	let raw: any[] = [];

	fs.readFile(
		path.resolve(__dirname, './rawData/device_data.json'),
		async (err, data) => {
			if (err) {
				throw new Error('failed to read data');
			}
			raw = JSON.parse(data.toString());
			raw.forEach((item: any) => {
				if (item.status == 200) {
					deviceDetails.push(normalize(item))
					deviceList.push({
						deviceName: item.data?.device_name,
						deviceImage: item.data?.device_image,
						deviceKey: item.data?.key,
						fkBrand: item.data?.key.split('_')[0],
					});
				}
			});

			try {
				await DeviceDetailsModel.bulkCreate<DeviceDetails>(deviceDetails);
				await DeviceModel.bulkCreate<Device>(deviceList);
			} catch (err: any) {
				console.log(err.message);
			}
		}
	);
};
