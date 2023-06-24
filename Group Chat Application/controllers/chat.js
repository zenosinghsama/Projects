const Message = require('../Models/chat')

exports.messagePage = (req, res, next) => {
    res.render('chat', {
        pageTitle: 'Message Page',
        path: '/',
        formCSS: true,
        productCSS: true,
        activemessage: true
    });
}

exports.postMessage = (req, res, next) => {
    const message = new Message(req.body.chat);
    message.save();
    res.redirect('/');
}

exports.getmessageInfo = (req, res, next) => {
    Message.fetchAll((messageInfo) => {
        res.render('chat', {
            prods: messageInfo,
            pageTitle: 'Message Here',
            path: '/',
            hasInfo: messageInfo.length > 0,
            activeShop: true,
            messageCSS: true
        });
    });
};