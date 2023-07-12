const path = require('path');
const UserModel = require("../Models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecretKey = 'expenseapp';

// Signup Page
const createNewUser = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;
        if(!name || email || password) {
            return res.status(400).json({ message: 'All fields are mandatory'});
        } else {
            const hashedPass = await bcrypt.hash(password, 10);
            await UserModel.create({
                name, 
                email, 
                password: hashedPass,
            });
            return res.status(201).json({ message: "User created Successfully"});
        }
    } catch (err) {
        return res.status(500).json({ message: err});
    }
};

// Generate Access Token
const AccessToken = (id, name, ispremiumUser) => {
    return jwt.sign({ userId:id, name: name, ispremiumUser}, process.env.JWT_SECRET_KEY)
}

//LOGIN PAGE
const ExistingUserController = async (req, res, next) => {
    try {
        const { email, password} = req.body;
        if(!email || password) {
            return res.status(400).json({ message: 'All fields are mandatory'})
        }
        const user = await UserModel.findOne({ where: { email } });
        if(user) {
            await bcrypt.compare(password, user.password, (hasherr, hashresponse) => {
                if(hasherr) {
                    throw new Error("Something went wrong");
                }
                if( hashresponse == true) {
                    return res.status(200).json({ success: true, message: "User logged in successfully", token: AccessToken(user.id, user.name, user.ispremiumUser) });
                }
                else if(hashresponse == false ) {
                    return res.status(401).json({ message: 'User not authorized. Password Incorrect'});
                }
            });
        } else {
            return res.status(404).json({ message:"user not found"});
        }
    } catch (err) {
        return res.status(500).json({ err});
    }
}

module.exports = { createNewUser,
    AccessToken,
    ExistingUserController
}
// exports.getLoginForm = (req, res, next) => {
//     res.sendFile(path.join(__dirname, "../Views", "login.html"));
// }

// exports.postLogin = async (req, res, next) => {
//     try {
//         const { email, password } = req.body;

//         // FInd User by Email
//         const user = await User.findOne({where: {email: email } });

//         if(!user) {
//             return res.status(404).json({ message: "User not Found" });
//         }

//         // Compare Hashed Password
//         const validPass = await bcrypt.compare(password, user.password);

//         if(!validPass) {
//             return res.status(500).json({ message: "User not Authorized" });
//         }

//         // Generate JWT Token
//         const token = jwt.sign({ userId: user.id }, jwtSecretKey);

//         // res.status(200).json( { redirectUrl: "/admin/add-expense" });
//         res.status(200).json( { token: token });
//     }  catch (err) {
//         res.status(500).json( {error: err });
//     }
// };