import { Router } from 'express';
import {
	createPosting,
	deletePosting,
	editPosting,
	getPostings,
} from '../services/postingService';

const router = Router();

router.post('/list', async (req, res) => {
	try {
		const response = await getPostings('', req.body.limit, req.body.offset);
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
		const response = await getPostings(query as string);
		res.status(200).json(response);
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
});

router.post('/create', async (req, res) => {
	try {
		const response = await createPosting(req.body.body);
		res.status(200).json(response);
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
});

router.patch('/edit/:id', async (req, res) => {
	try {
		const id = Number(req.params.id)
		const comments = req.body.comments
		const price = Number(req.body.price)
		const response = await editPosting(id, comments, price)
		res.status(200).json(response);
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
});

router.delete('/delete/:id', async (req, res) => {
	try {
		const id = Number(req.params.id)
		const response = await deletePosting(id)
		res.status(200).json(response)
	} catch (err: any) {
		res.status(400).json({message: err.message})
	}
})

export default router;
