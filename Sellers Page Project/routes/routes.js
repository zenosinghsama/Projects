const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProduct);

router.post('/add-product', adminController.postAddProduct);

router.delete('/products/:productId', adminController.deleteProduct);

module.exports = router;