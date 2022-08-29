import { Router } from 'express';
import { getAllPostings } from '../services/postingService';

const router = Router();

router.get('/postings', async (req, res) => {
    try {
		const response = await getAllPostings()
		res.status(200).json(response)
	} catch (err:any) {
		res.status(400).json({message: err.message})
	}
})

export default router