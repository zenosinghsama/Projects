const path = require('path');

const express = require('express');

//const rootDir = require('../util/path')

const loginController = require('./controllers/login');

const router = express.Router();

router.get('/login', loginController.loginPage);

router.post('/login', loginController.postLogin);

module.exports = router;

// (req, res, next) => {
//     res.sendFile(path.join(__dirname, 'views', 'login.html'));    
// }

// (req, res, next) => {
//     res.redirect('/');

// }