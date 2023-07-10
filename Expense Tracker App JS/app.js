const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const Expense = require('./Models/expense');

var cors = require('cors');

const app = express();

const adminRoutes = require('./routes/admin');
const signupRoutes = require('./routes/signup');

app.use(cors());

app.use(bodyParser.json({extended: false}));
app.use(express.static(path.join(__dirname, '/public/')));

app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'html');

app.use('/admin', adminRoutes);
app.use(signupRoutes);

app.get('/', (req, res, next) => {
    Expense.findAll() 
    .then(expenses => {
        res.sendFile(path.join(__dirname, 'Views', 'Signup.html'));
    })
    .catch(err => console.log(err));
});

sequelize
.sync()
.then(result => {
    app.listen(4000);
})
.catch(err => console.log(err));