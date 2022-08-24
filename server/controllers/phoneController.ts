import { Router } from 'express';
import { compileSearch } from '../services/phoneService';

const router = Router();

router.post('/phone', async (req, res) => {
	try {
		const response = await compileSearch(req.body.type, req.body.query);
		if (response.data.data == null) {
			res.status(404).json({ message: 'not found' });
		} else {
			res.status(200).json(response.data);
		}
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
});

export default router;
