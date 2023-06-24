const User = require('../models/user');

//Add User
exports.getAddUser = (req, res, next) => {
    res.render('login', {
        pageTitle: 'ADD USER',
        path: '/'
    });
};

exports.postAddUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const phonenumber = req.body.phonenumber;
    User.create({
        name: name,
        email: email,
        phonenumber: phonenumber
    })
    .then(result => {
        console.log('User Created');
        res.redirect('/users')
    })
    .catch(err => {
        console.log(err)
    });
};

exports.getUser = (req, res, next) => {
    User.findAll()
    .then(users => {
        res.render('admin/users', {
            prods: users,
            pageTitle: 'Admin',
            path: '/admin/users'
        });
    })
    .catch(err => console.log(err));
};


