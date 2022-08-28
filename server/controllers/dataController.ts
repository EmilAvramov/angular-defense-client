import { Router } from 'express';
import { getRecommended } from '../services/dataService';

const router = Router();

router.get('/recommended', async (req, res) => {
	try {
		const {latest, popular} = await getRecommended()
		res.status(200).json({latest, popular})
	} catch (err: any) {
		res.status(400).json({message: err.message})
	}
})

export default router;
