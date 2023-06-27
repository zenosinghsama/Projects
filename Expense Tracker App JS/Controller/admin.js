const path = require('path')

const Expense = require('../Models/expense');

exports.getAddExpense = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../Views', 'index.html'));
};

exports.postAddExpense = (req, res, next) => {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;

    Expense.create({
        amount: amount,
        description: description,
        category: category
    })
    .then(result => {
        console.log('Expense Created');
        res.redirect('/');
    })
    .catch(err => console.log(err));
}

// exports.getEditExpense();

// exports.postEditExpense();

exports.getExpense = (req, res, next) => {
    Expense.findAll()
    .then(expenses => {
        const expenseData = expenses.map(expense => {
            return { 
                id: expense.id,
                amount: expense.amount,
                description: expense.description
            };
        });
        res.json( {expenses: expenseData} );
    })
    .catch(err => console.log(err));
}

// exports.postDeleteProduct = (req, res, next)