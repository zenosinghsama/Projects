const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense', 'root', '1234', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = sequelize;
