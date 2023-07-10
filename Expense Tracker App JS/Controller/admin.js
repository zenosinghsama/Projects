const path = require('path')

const Expense = require('../Models/expense');

exports.getAddExpense = (req, res, next) => {
  res.sendFile(path.join(__dirname, '../Views', 'index.html'));
};

exports.postAddExpense = async (req, res, next) => {

  try {
    const date = req.body.date;
    const amount = req.body.amount;
    const detail = req.body.detail;
    const category = req.body.category;

    const expense = await Expense.create({
      date: date,
      amount: amount,
      detail: detail,
      category: category
    })
    res.status(201).json({ newExpense: expense });
  }
  catch (err) {
    res.status(500).json({
      error: err
    })
  }
};

exports.getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.findAll()
    res.status(200).json({ allExpenses: expenses });
  }
  catch (err) {
    console.log('Failed to GET Expense', JSON.stringify(err))
    res.status(500).json({
      error: err
    })
  }
};

exports.updateExpense = async (req, res, next) => {
  const expenseId = req.params.expenseId;

  try {
    const updatedExpense = await Expense.update(
      {
        date: req.body.date,
        amount: req.body.amount,
        detail: req.body.detail,
        category: req.body.category
      },
      { where: { id: expenseId } }
    );
    res.status(200).json({ message: 'Expense Updated' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
}

exports.deleteExpense = async (req, res, next) => {
  const expenseId = req.params.expenseId;

  try {
    await Expense.destroy({ where: { id: expenseId } });
    res.status(200).json({ message: 'Expense Deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
}

