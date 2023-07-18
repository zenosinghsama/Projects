const express = require('express');

const router = express.Router();

const authMiddleware = require('../Middleware/auth');

const expenseController = require('../Controllers/expenseController');

// router.get('/admin/add-expense', authMiddleware.authenticateToken,expenseController.getExpenseForm);

router.post('/admin/add-expense', authMiddleware.authenticateToken, expenseController.addExpense);

router.get('/admin/expenses', authMiddleware.authenticateToken, expenseController.getAllExpenses);

module.exports = router;
