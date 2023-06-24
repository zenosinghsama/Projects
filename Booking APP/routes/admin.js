const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/', adminController.getAddUser);

router.get('/users', adminController.getUser);

router.post('/add-user', adminController.postAddUser);

module.exports = router;