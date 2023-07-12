const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        required: true,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        required: true,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        required: true
    },
})

module.exports = User;