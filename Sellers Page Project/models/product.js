const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    price: {
        type: Sequelize.STRING,
        required: true
    },
    name: {
        type: Sequelize.STRING,
        required: true
    },
    category: {
        type: Sequelize.STRING,
        required: true
    }
});

module.exports = Product;