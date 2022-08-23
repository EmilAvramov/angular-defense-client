import { Router } from 'express';
import { register } from '../services/userService';

const router = Router();

router.post('/register', async (req, res) => {
	await register(req.body)
});

export default router
