const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const ExpenseModel= sequelize.define("expense", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    amount: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    detail: {
        type: Sequelize.STRING,
        allowNull: true
    },
    category: {
        type: Sequelize.STRING,
        allowNull: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = ExpenseModel;
