import axios from 'axios';
import { apiHost, headers } from '../config/settings';

// export const compileSearch = (type: string, query: string) => {
// 	let body = {};
// 	if (type === 'details') {
// 		body = {
// 			route: 'device-detail',
// 			key: query,
// 		};
// 	} else if (type === 'news') {
// 		body = {
// 			route: 'search',
// 			query: query,
// 		};
// 	}

// 	try {
// 		return axios.post(apiHost, body, { headers });
// 	} catch (err: any) {
// 		throw new Error(err.message);
// 	}
// };

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
		const status = response.data.status
		return { news, reviews, status };
	} catch (err: any) {
		throw new Error(err.message);
	}
};
