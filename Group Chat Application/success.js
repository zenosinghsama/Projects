const express = require('express');

const router = express.Router();
const finalPageController = require('./controllers/success');

router.get('/success', finalPageController.SuccessController);

module.exports = router;