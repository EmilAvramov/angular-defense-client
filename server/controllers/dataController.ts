import { Router } from 'express';
import { getBrands, getDevices, getRecommended, readyData } from '../services/dataService';

const router = Router();

router.get('/brands', async (req, res) => {
	try {
		await getBrands();
		res.status(200).json({ message: 'Brands Data Refreshed' });
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
});

router.get('/devices', async (req, res) => {
    try {
		await getDevices();
		res.status(200).json({ message: 'Device Data Refreshed' });
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
});

router.get('/loadData', async (req, res) => {
	try {
		await readyData();
		res.status(200).json({message: 'Data loaded'})
	} catch (err: any) {
		res.status(400).json({message: err.message})
	}
})

router.get('/recommended', async (req, res) => {
	try {
		const {latest, popular} = await getRecommended()
		res.status(200).json({latest, popular})
	} catch (err: any) {
		res.status(400).json({message: err.message})
	}
})

export default router;
