const http = require('http');

const express = require('express')

const app = express();

app.use((req, res, next) => {
    console.log('In the Middleware!');
    next(); // Allows the request to continue to next middleware in line
});

app.use((req, res, next) => {
    console.log('In another Middleware!');
    res.send('<h1>Hello from Express!</h1>'); // Allows to send a response and allows to attach body which is of type any
    //res.send({'key1':'value'})
});

app.listen(3000);
 