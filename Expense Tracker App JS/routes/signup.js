const express = require('express');

const signupController = require('../Controller/signup');
const loginController = require('../Controller/login');

const router = express.Router();

router.get('/user/signup', signupController.getAddUser);

router.post('/user/signup', signupController.postAddUser);


//LOGIN ROUTES
router.get('/user/login', loginController.getLoginForm);

router.post('/user/login', loginController.postLogin);

module.exports = router;