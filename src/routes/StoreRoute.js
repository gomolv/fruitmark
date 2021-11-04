const express = require('express');
const storeRouter = express.Router();
const { register, list, getStore } = require('../controllers/storeController')


storeRouter.post('/register', register);
storeRouter.get('/list', list);
storeRouter.get('/store', getStore);


module.exports = storeRouter;