const path = require('path');

const User = require("../Models/usersignup");

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY

exports.getLoginForm = (req, res, next) => {
    res.sendFile(path.join(__dirname, "../views", "login.html"));
}

exports.postLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // FInd User by Email
        const user = await User.findOne({where: {email: email } });

        if(!user) {
            return res.status(404).json({ message: "User not Found" });
        }

        // Compare Hashed Password
        const validPass = await bcrypt.compare(password, user.password);

        if(!validPass) {
            return res.status(500).json({ message: "User not Authorized" });
        }

        // Generate JWT Token
        const token = jwt.sign({ userId: user.id }, jwtSecretKey);

        // res.status(200).json( { redirectUrl: "/admin/add-expense" });
        res.status(200).json( { token: token });
    }  catch (err) {
        res.status(500).json( {error: err });
    }
};