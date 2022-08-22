import { Router } from 'express';
import { register } from '../services/userService';

const router = Router();

router.post('/users/login', (req, res) => {
	const data = req.body;
});

export default router
