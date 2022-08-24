import axios from 'axios';
import { apiHost, headers } from '../config/settings';

export const compileSearch = (type: string, query: string) => {
	let body = {};
	if (type === 'details') {
		body = {
			route: 'device-detail',
			key: query,
		};
	} else if (type === 'news') {
		body = {
			route: 'search',
			query: query,
		};
	}

	try {
		return axios.post(apiHost, body, { headers });
	} catch (err: any) {
		throw new Error(err.message);
	}
};
