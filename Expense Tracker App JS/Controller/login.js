const path = require('path');

const User = require("../Models/usersignup");

exports.getLoginForm = (req, res, next) => {
    res.sendFile(path.join(__dirname, "../views", "login.html"));
}

exports.postLogin = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findAll({where: {email: email } });

        if(!user) {
            return res.status(500).json({ field: "email" });
        }

        if(user.password !== password) {
            return res.status(500).json({ field: "password" });
        }
        res.status(200).json( { message: "Login Successful" });
    }  catch (err) {
        res.status(500).json( {error: err });
    }
};