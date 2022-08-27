import { Router } from 'express';
import { getDetails, getList, getNews } from '../services/deviceService';

const router = Router();

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

router.post('/list', async (req, res) => {
	try {
		const response = await getList('', req.body.limit, req.body.offset)
		res.status(200).json(response)
	} catch (err:any) {
		res.status(400).json({message: err.message})
	}
})

router.post('/list/search', async (req, res) => {
	try {
		let query = req.query.query
		if (!query) {
			res.status(404).json({message: 'not found'})
		} 
		const response = await getList(query as string)
		res.status(200).json(response)
	} catch (err:any) {
		res.status(400).json({message: err.message})
	}
})

router.post('/list/:id', async (req, res) => {
	try {
		console.log(req.params.id)
		const response = await getDetails(req.params.id)
		res.status(200).json(response.data.data)
	} catch (err:any) {
		res.status(400).json({message: err.message})
	}
})

export default router;
