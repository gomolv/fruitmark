const express = require('express');
const productRouter = express.Router();
const { transfer, getProducts, register } = require('../controllers/productController')



productRouter.post('/register', register);
productRouter.put('/transfer', transfer);
productRouter.get('/inStore', getProducts);

module.exports = productRouter;