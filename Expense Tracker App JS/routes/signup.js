const express = require('express');

const signupController = require('../Controller/signup');

const router = express.Router();

router.get('/user/signup', signupController.getAddUser);

router.post('/user/signup', signupController.postAddUser);

module.exports = router;