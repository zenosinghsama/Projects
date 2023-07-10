const express = require('express');

const adminController = require('../Controller/admin');

const router = express.Router();

router.get('/add-expense', adminController.getAddExpense);

router.post('/add-expense', adminController.postAddExpense);

router.get('/expenses', adminController.getExpenses);

router.put('/expenses/:expenseId', adminController.updateExpense);

router.delete('/expenses/:expenseId', adminController.deleteExpense);

module.exports = router;