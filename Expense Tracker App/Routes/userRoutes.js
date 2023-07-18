const express = require('express');

const router = express.Router();

const userController = require('../Controllers/userController');

router.post('/user/signup', userController.createNewUser);

// router.get('/user/login', userController.getLoginPage);

router.post('/user/login', userController.postLogin);

module.exports = router;