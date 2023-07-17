const path = require('path');

const User = require('../models/user');

//Add User
exports.getAddUser = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views', 'form.html'));
};


exports.postAddUser = async (req, res, next) => {

    try {
        const name = req.body.name;
        const email = req.body.email;
        const phonenumber = req.body.phonenumber;

        const user = await User.create({
            name: name,
            email: email,
            phonenumber: phonenumber
        })
        res.status(201).json({ newUser: user });
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
};


exports.getUser = async (req, res, next) => {
    try {
        const users = await User.findAll()
        res.status(200).json({ allUsers: users });
    }
    catch (err) {
        console.log("Failed to GET User", JSON.stringify(err))
        res.status(500).json({
            error: err
        })
    }
};

exports.updateUser = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const updatedUser = await User.update (
            {
                name: req.body.name,
                email: req.body.email,
                phonenumber: req.body.phonenumber

        },
            { where: { id:userId } }
        );
        res.status(200).json( {message: 'User Updated' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}

exports.deleteUser = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        await User.destroy({ where: { id: userId } });
        res.status(200).json({ message: 'User Deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}

