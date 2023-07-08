const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNUll: false,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        required: true
    },
    email: {
        type: Sequelize.STRING,
        required: true
    },
    password: {
        type: Sequelize.STRING,
        required: true
    },
})

module.exports = User;