import { Router } from 'express';
import { getDevices } from '../services/deviceService';

const router = Router();

router.post('/list', async (req, res) => {
	try {
		const response = await getDevices(
			'',
			req.body.limit,
			req.body.offset
		);
		res.status(200).json(response);
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
});

router.post('/list/search', async (req, res) => {
	try {
		let query = req.query.query;
		if (!query) {
			res.status(404).json({ message: 'not found' });
		}
		const response = await getDevices(query as string);
		res.status(200).json(response);
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
});

export default router;
