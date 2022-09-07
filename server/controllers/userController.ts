import { Router } from 'express';
import {
	register,
	login,
	logout,
	validateToken,
	editUserDetails,
	editUserPassword,
	deleteUser,
} from '../services/userService';

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
		res.status(200).json(validateToken(req.body.token));
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
});

router.patch('/edit/details/:id', (req, res) => {
	try {
		let id = Number(req.params.id);
		let data = req.body;
		res.status(200).json(editUserDetails(id, data));
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
});

router.patch('/edit/password/:id', (req, res) => {
	try {
		let id = Number(req.params.id);
		let password = req.body.password;
		res.status(200).json(editUserPassword(id, password));
	} catch (err: any) {
		res.status(400).json({ error: err.message });
	}
});

router.delete('/delete/:id', (req, res) => {
	try {
		res.status(200).json(deleteUser(Number(req.params.id)));
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
});

export default router;
