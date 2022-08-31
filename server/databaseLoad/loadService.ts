import { Device } from '../interfaces/Device.interface';
import fs from 'fs';
import path from 'path';
import { DeviceDetails } from '../interfaces/DeviceDetails.interface';
import { Brand } from '../interfaces/Brand.interface';
import { normalize } from './functions';
import { BrandModel, DeviceModel, DeviceDetailsModel } from '../models/models';

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
