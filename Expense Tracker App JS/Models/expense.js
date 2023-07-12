const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Expense = sequelize.define('Expense', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    date: {
        type: Sequelize.DATE,
        required: true
    },
    amount: {
        type: Sequelize.STRING,
        required: true
    },
    detail: {
        type: Sequelize.STRING,
        required: true
    },
    category: {
        type: Sequelize.STRING,
        required: true
    }
});

module.exports = Expense;