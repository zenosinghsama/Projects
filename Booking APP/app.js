const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const app = express();

app.set('views', path.join(__dirname, 'views'));

const adminRoutes = require('./routes/admin');

app.use(bodyParser.json({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', adminRoutes);

app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'form.html'));
});

sequelize
.sync()
.then(result => {
    app.listen(5000);
})
.catch(err => console.log(err));