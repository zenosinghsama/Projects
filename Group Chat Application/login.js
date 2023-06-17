const path = require('path');

const express = require('express');

//const rootDir = require('../util/path')

const loginController = require('../controllers/login');

const router = express.Router();

router.get('/login', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));    
});

router.post('/login', (req, res, next) => {
    res.redirect('/');

});

module.exports = router;

