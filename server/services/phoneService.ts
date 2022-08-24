import axios from 'axios';

const endpoint =
	'https://script.google.com/macros/s/AKfycbxNu27V2Y2LuKUIQMK8lX1y0joB6YmG6hUwB1fNeVbgzEh22TcDGrOak03Fk3uBHmz-/exec';

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

	const headers = {
		'content-type': 'application/json',
	};

	try {
		return axios.post(endpoint, body, { headers: headers });
	} catch (err: any) {
		throw new Error(err.message);
	}
};
