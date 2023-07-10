const path = require('path');

const User = require("../Models/usersignup");

exports.getAddUser = (req, res, next) => {
    res.sendFile(path.join(__dirname, "../views", "Signup.html"));
};

exports.postAddUser = async (req, res, next) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.create ({
            username: username,
            email: email,
            password: password,
        });
        res.status(201).json({ newUser: user });
    }catch (err) {
        res.status(500).json( { error: err } );
    }
};

