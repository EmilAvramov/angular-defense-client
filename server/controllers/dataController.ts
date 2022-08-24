import { Router } from 'express';
import { getData } from '../services/dataService';

const router = Router();

router.get('/brands', (req, res) => {
    getData()

    res.status(200).json({message: 'Brands Data Refreshed'})
})

router.get('/devices', async (req, res) => {

})

export default router