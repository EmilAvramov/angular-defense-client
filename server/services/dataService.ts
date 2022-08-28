import axios from 'axios';
import { apiHost } from '../config/settings';
import { Brand, Device } from '../interfaces/Device.interface';
import {
	BrandModel,
	DeviceModel,
	DeviceDetailsModel,
} from '../models/database.model';
import { data } from '../config/data';
import { DeviceDetails } from '../interfaces/DeviceDetails.interface';

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

export const getDevices = async () => {
	try {
		const response = await axios.get(`${apiHost}?route=device-list`);
		const normalized: any[] = [];
		response.data.data.map((item: any) => {
			item.device_list.map((device: any) => {
				normalized.push({
					deviceId: device.device_id,
					deviceName: device.device_name,
					deviceType: device.device_type,
					deviceImage: device.device_image,
					deviceKey: device.key,
					fkBrand: item.brand_id,
				});
			});
		});
		await DeviceModel.bulkCreate<Device>(normalized, {
			fields: [
				'deviceId',
				'deviceName',
				'deviceType',
				'deviceImage',
				'deviceKey',
				'fkBrand',
			],
			updateOnDuplicate: ['deviceName', 'deviceType', 'deviceImage', 'deviceKey'],
			returning: true,
		});
	} catch (err: any) {
		throw new Error(err.message);
	}
};

export const getRecommended = async () => {
	try {
		const response = await axios.get(`${apiHost}?route=recommended`);
		const latest = response.data.data.recommended_1.data.map((item: any) => {
			return {
				deviceName: item.device_name,
				deviceImage: item.device_image,
				deviceKey: item.key,
			};
		});
		const popular = response.data.data.recommended_3.data.map((item: any) => {
			return {
				rank: item.no,
				deviceName: item.device_name,
				dailyHits: item.daily_hits,
				deviceKey: item.key,
			};
		});
		return {
			latest,
			popular,
		};
	} catch (err: any) {
		throw new Error(err.message);
	}
};

export const readyData = async () => {
	const aggregatedData: any[] = [];
	const normalized = (entry: any) => {
		return {
			deviceKey: entry.data?.key,
			deviceName: entry.data?.device_name,
			deviceImage: entry.data?.device_image,
			connectivity: entry.data?.more_specification[0].data[0]?.data[0],
			launchDate: entry.data?.release_date,
			dimensions: entry.data?.more_specification[2].data[0]?.data[0],
			weight: entry.data?.more_specification[2].data[1]?.data[0],
			build: entry.data?.more_specification[2].data[2]?.data[0],
			sim: entry.data?.more_specification[2].data[3]?.data[0],
			display: entry.data?.more_specification[3].data[0]?.data[0],
			size: entry.data?.more_specification[3].data[1]?.data[0],
			resolution: entry.data?.more_specification[3].data[2]?.data[0],
			protection: entry.data?.more_specification[3].data[3]?.data[0],
			os: entry.data?.more_specification[4].data[0]?.data[0],
			chipset: entry.data?.more_specification[4].data[1]?.data[0],
			cpu: entry.data?.more_specification[4].data[2]?.data[0],
			gpu: entry.data?.more_specification[4].data[3]?.data[0],
			cardSlot: entry.data?.more_specification[5].data[0]?.data[0],
			internalStorage: entry.data?.more_specification[5].data[1]?.data[0],
			cameraMain: entry.data?.more_specification[6].data[0]?.data[0],
			videoMain: entry.data?.more_specification[6].data[2]?.data[0],
			cameraSelfie: entry.data?.more_specification[7].data[0]?.data[0],
			videoSelfie: entry.data?.more_specification[7].data[2]?.data[0],
			speakers: entry.data?.more_specification[8].data[2]?.data[0],
			jack: entry.data?.more_specification[8].data[1]?.data[0],
			features: entry.data?.more_specification[10].data[0]?.data[0],
			batteryCharge: entry.data?.more_specification[11].data[1]?.data[0],
			batteryType: entry.data?.more_specification[11].data[0]?.data[0],
			price: entry.data?.more_specification[12].data[4]?.data[0],
		};
	};
	data.forEach((item: any) => aggregatedData.push(normalized(item)));

	console.log(aggregatedData)

	await DeviceDetailsModel.bulkCreate<DeviceDetails>(aggregatedData);
};
