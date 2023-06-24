const path = require('path');

const express = require('express');

const chatController = require('./controllers/chat')

const router = express.Router();

router.get('/', chatController.messagePage);

router.post('/', chatController.postMessage);

module.exports = router;