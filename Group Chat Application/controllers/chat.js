const path = require('path');

exports.messageController = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../','views', 'chat.html'))
    }