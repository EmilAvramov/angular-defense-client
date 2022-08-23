import { Router } from 'express';
import { register } from '../services/userService';

const router = Router();

router.post('/register', (req, res) => {
	console.log('server says', req.body)
});

export default router
