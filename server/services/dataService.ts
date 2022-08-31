import axios from 'axios';
import { apiHost, headers } from '../config/settings';

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