const path = require('path');
const ExpenseModel = require('../Models/expenseModel');

// // GET EXPENSE FORM
// exports.getExpenseForm = async ( req, res, next) => {
//     res.sendFile(path.join(__dirname, '../Views', 'main.html'));
// }

exports.addExpense = async (req, res, next) => {
    
        const { amount, description, category } = req.body;
     
        try {
            if(amount == undefined || amount.length === 0) {
                return res.status(400).json({ success: false, message: "Something is missing"})
            }
            const expense =  ExpenseModel.create({ amount, description, category})
            return res.status(201).json({ expense, success: true });
        }
        catch(err) {
        console.log(err);
        res.status(500).json({success: false, error: err});
    }
};

//GET EXPENSES
exports.getAllExpenses = (req, res, next) => {
    
    try {
        const expenses = ExpenseModel.findAll({ where: { userId: req.user.id }})
        return res.status(200).json({ expenses, success: true})
    }
    catch(err) {
           return res.status(500).json({ error: err, success: false});
        }
}



