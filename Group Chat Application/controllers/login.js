const Login = require('../Models/login')

exports.loginPage = (req, res, next) => {
    res.render('login', {
        pageTitle: 'Login Page',
        path: '/login',
        formCSS: true,
        productCSS: true,
        activeLogin: true
    });
}

exports.postLogin = (req, res, next) => {
    const login = new Login(req.body.username);
    login.save();
    res.redirect('/');
}

exports.getLoginInfo = (req, res, next) => {
    Login.fetchAll((loginInfo) => {
        res.render('chat', {
            prods: loginInfo,
            pageTitle: 'Message Here',
            path: '/',
            hasInfo: loginInfo.length > 0,
            activeShop: true,
            loginCSS: true
        });
    });
};