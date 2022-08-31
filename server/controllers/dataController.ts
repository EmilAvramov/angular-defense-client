import { Router } from 'express';
import { getNews, getRecommended } from '../services/dataService';

const router = Router();

router.get('/recommended', async (req, res) => {
	try {
		const {latest, popular} = await getRecommended()
		res.status(200).json({latest, popular})
	} catch (err: any) {
		res.status(400).json({message: err.message})
	}
})

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
