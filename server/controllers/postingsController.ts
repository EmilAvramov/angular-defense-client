import { Router } from 'express';
import {
	createPosting,
	deletePosting,
	editPosting,
	getPostings,
	getUserPostings,
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
		const response = await getPostings(query as string);
		res.status(200).json(response);
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
});

router.get('/user/:id', async (req, res) => {
	try {
		const response = await getUserPostings(Number(req.params.id));
		res.status(200).json(response);
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
});

router.post('/create', async (req, res) => {
	try {
		const response = await createPosting(req.body.payload);
		res.status(200).json(response);
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
});

router.put('/edit/:id', async (req, res) => {
	try {
		const id = Number(req.params.id);
		const comments = req.body.comments;
		const price = req.body.price;
		const response = await editPosting(id, comments, price);
		res.status(200).json(response);
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
});

router.delete('/delete/:id', async (req, res) => {
	try {
		const id = Number(req.params.id);
		const response = await deletePosting(id);
		res.status(200).json(response);
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
});

export default router;
