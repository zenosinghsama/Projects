const path = require('path');

const express = require('express');

const adminController = require('../Controller/admin');

const router = express.Router();

router.get('/', adminController.getAddExpense);

router.get('/expenses', adminController.getExpense);

router.post('/add-expense', adminController.postAddExpense);

module.exports = router;