import { Router } from 'express';
import { register, login, logout, validateToken } from '../services/userService';

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

router.post('/validate', (req, res) => {
	try {
		res.status(200).json(validateToken(req.body.token))
	} catch (err: any) {
		res.status(400).json({error: err.message})
	}
})

export default router;
