import express from 'express';
import { cors } from '../middelwares/cors';
import userController from '../controllers/userController'
import phoneController from '../controllers/phoneController';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userController);
app.use('/query', phoneController)

export default app
