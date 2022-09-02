import { Router } from 'express';
import { register, login, logout } from '../services/userService';

const router = Router();

router.post('/register', async (req, res) => {
	try {
		const response = await register(req.body);
		res.status(201).json(response);
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
});

router.post('/login', async (req, res) => {
	try {
		const response = await login(req.body);
		res.status(200).json(response);
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
});

router.post('/logout', (req, res) => {
	try {
		logout(req.body.accessToken);
		res.status(200).json({ message: 'Successfully logged out' });
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
});

export default router;
