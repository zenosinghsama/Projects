const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecretKey = 'expenseapp';

const User = require('../Models/userModel');
const path = require('path');


//SIGNUP CONTROLLER
exports.createNewUser = async(req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ where : { email: email } });
        if(existingUser) {
            return res.status(409).json({ error: 'Email already exists'})
        }

        //Generate Salt -> to use for hashing
        const salt = await bcrypt.genSalt(10);

        //Hash the Password
        const hashedPassword = await bcrypt.hash(password, salt);

        await User.create({
            name: name,
            email: email,
            password: hashedPassword
        });

        res.status(200).json({ message: 'User created successfully'});
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error'}); 
    }
}

// //GET LOGIN PAGE
// exports.getLoginPage = async (req, res, next) => {
//     res.sendFile(path.join(__dirname, '../Views', 'login.html'));
// }

//GENERATE TOKEN
const generateAccessToken = (id, name, ispremiumuser) => {
    return jwt.sign({ userId: id, name: name, ispremiumuser }, 'cgM1IZO3sD')
}

// LOGIN CONTROLLER
exports.postLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findAll({ where: { email } });

        if(user.length > 0) {
            await bcrypt.compare(password, user[0].password, (err, result) => {
                if(err) {
                    throw new Error("Something Went Wrong");
                }
                if(result == true) {
                    return res.status(200).json({ 
                    success: true,
                    message:"User Logged in successfully",
                    token: generateAccessToken(user[0].id, user[0].name, user[0].ispremiumuser)
                });
                }
                else if(result == false) {
                    return res.status(401).json({ message: "User not Authorized"});
                }
            });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch(error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
