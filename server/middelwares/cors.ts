import { Request, Response, NextFunction } from 'express';

module.exports = () => (req: Request, res: Response, next: NextFunction) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, OPTIONS, HEAD'
	);
	res.setHeader('Access-Control-Allow-Headers', [
		'Content-Type',
		'X-Authorization',
	]);
	next();
};
