const path = require('path');

exports.SuccessController = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'success.html'));
}