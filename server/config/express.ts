import express from 'express';
import { cors } from '../middelwares/cors';
import userController from '../controllers/userController'
import phoneController from '../controllers/phoneController';
import dataController from '../controllers/dataController'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userController);
app.use('/device', phoneController)
app.use('/data', dataController)

export default app
