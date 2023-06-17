
const express = require('express');

const router = express.Router();
const contacusController = require('./controllers/contact-us')

router.get('/contact-us', contacusController.contactController);

router.post('/contact-us', contacusController.postContactus);

module.exports = router;