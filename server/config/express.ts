const express = require('express');
const cors = require('cors');
const userController = require('../controllers/userController')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userController)

module.exports = app