const path = require('path');

const Expense = require('../Models/expenseModel');

exports.getExpensePage = (req, res, next) => {
    res.sendFile(path.join(__dirname, "../Views", "index.html"));
};

exports.postAddExpense = async (req, res, next) => {
    try {
        const {amount, detail, category } = req.body;

        //Create Expense
        const expense = await Expense.create ({
            amount: amount,
            detail: detail,
            category: category,
            userId: req.user.id
        });
        res.status(200).json({ newExpense: expense});
    } catch(err) {
        res.status(500).json({ error: err });
    }
}

exports.getExpenseData = async(req, res, next) => {
    try{
        const expenses = await Expense.findAll({
            where: { userId: req.user.userId }
        });

        res.status(200).json(expenses);
    } catch(err) {
        res.status(500).json( { error: err });
    }
}

// Delete Expense

exports.deleteExpense = async (req, res, next) => {
    try {
        const { id } = req.params;
        if(!id) {
            return res.status(400).json({ error: 'Expense Id is missing'})
        }
        const delres = await Expense.destroy({ where: {id, userId: req.user.userId}});
        if(delres === 0) {
            return res.status(400).json( {error: 'Expense not Found'});
        }
        res.sendStatus(200);
    } catch (err) {
        console.error(`Error in deleting expense: {err}`);
        res.status(500).json({error: err.message || err})
    }
}