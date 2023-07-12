const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const UserModel = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    ispremiumuser: {
        type: Sequelize.STRING,
        defaultValue: false
    }
})

module.exports = UserModel;