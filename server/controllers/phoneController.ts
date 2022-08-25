import { Router } from 'express';
import { getNews } from '../services/phoneService';

const router = Router();

// router.post('/phone', async (req, res) => {
// 	try {
// 		const response = await compileSearch(req.body.type, req.body.query);
// 		if (response.data.data == null) {
// 			res.status(404).json({ message: 'not found' });
// 		} else {
// 			res.status(200).json(response.data);
// 		}
// 	} catch (err: any) {
// 		res.status(400).json({ message: err.message });
// 	}
// });

router.post('/news', async (req, res) => {
	try {
		let query = req.query.query
		if (!query) {
			query = ''
		}
		const { news, reviews, status } = await getNews(query as string);
		if (status !== 200) {
			res.status(404).json({ message: 'not found' });
		} else {
			res.status(200).json({ news, reviews });
		}
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
});

export default router;
