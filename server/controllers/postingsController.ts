import { Router } from 'express';
import {
	createPosting,
	getAllPostings,
	getFilteredPostings,
	loadDetails,
} from '../services/postingService';

const router = Router();

router.get('/list', async (req, res) => {
	try {
		const response = await getAllPostings();
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
		const response = await getFilteredPostings(query as string);
		res.status(200).json(response);
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
});

router.post('/create', async (req, res) => {
	try {
		const response = await createPosting(req.body);
		res.status(200).json(response);
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
});

router.post('/create/:deviceName', async (req, res) => {
	try {
		const response = await loadDetails(req.body);
		res.status(200).json(response);
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
})

export default router;
