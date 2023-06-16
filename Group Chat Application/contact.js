const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/contact-us', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

router.post('/contact-us', (req, res, next) => {
    res.redirect('/success');
});

module.exports = router;