const express = require('express');
const userRouter = express.Router();
const { login, auth, register } = require('../controllers/userController')


userRouter.get('/auth', auth);
userRouter.post('/login', login);
userRouter.post('/register', register);
module.exports = userRouter;