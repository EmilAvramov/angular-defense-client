import { Router } from 'express';
import { getBrands, getDevices } from '../services/dataService';

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

export default router;
