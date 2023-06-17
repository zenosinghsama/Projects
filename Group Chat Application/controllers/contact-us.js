const path = require('path');

 exports.contactController = (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
}

exports.postContactus = (req, res, next) => {
    res.redirect('/success');
}
