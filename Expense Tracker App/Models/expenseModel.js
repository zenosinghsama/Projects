const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  amountType: {
    type: String,
    default: 'expense',
  },
});

const ExpenseModel = mongoose.model('Expense', expenseSchema);

module.exports = ExpenseModel;



// const Sequelize = require('sequelize');
// const sequelize = require('../Util/database');

// const ExpenseModel = sequelize.define('Expense', {
//     id: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     amount: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//     },
//     description: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     category: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     amountType: {
//         type: Sequelize.STRING,
//         defaultValue: 'expense'
//     }
// });

// module.exports = ExpenseModel;