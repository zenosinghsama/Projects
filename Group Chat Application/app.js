const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const loginRoutes = require('./login');
const chatRoutes = require('./chat');
const contactRoutes  = require('./contact');

const Success = require('./success');

app.use(bodyParser.urlencoded({extended: false}));

app.use(loginRoutes);
app.use(chatRoutes);
app.use(contactRoutes);

app.use(Success);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(4000);