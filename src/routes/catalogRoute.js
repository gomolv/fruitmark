const express = require('express');
const catalogRouter = express.Router();
const { register, getCatalog, getItem } = require('../controllers/catalogController')

catalogRouter.post('/register', register);
catalogRouter.get('/list', getCatalog);
catalogRouter.get('/item', getItem);
module.exports = catalogRouter;