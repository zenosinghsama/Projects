const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorCOntroller = require('./controllers/404');

const app = express();

app.set('views', path.join(__dirname, 'views'));

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
  });

 app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'chat.html'))
    });

const loginRoutes = require('./login');
const chatRoutes = require('./chat');
const contactRoutes  = require('./contact');
const Success = require('./success');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))


app.use(loginRoutes);
app.use(chatRoutes);
app.use(contactRoutes);
app.use(Success);

app.use(errorCOntroller.get404);

app.listen(4000);