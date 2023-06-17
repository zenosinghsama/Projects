cosnt login =[];

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
    login.push({title: req.body.title});
    res.redirecct('/');
}