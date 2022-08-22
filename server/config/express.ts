import express from 'express';
import { cors } from '../middelwares/cors';
import userController from '../controllers/userController'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userController);

export default app
