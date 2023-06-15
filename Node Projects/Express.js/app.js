const express = require('express')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/add-product', (req, res, next) => {
   //console.log('In another Middleware!');
    res.send(`
    <form action="/product" method = "POST">
    <input type = "text" name="title" placeholder = "Product Title">
    <input type = "number" name = "size" placeholder = "Product Size"> 
    <button type ="submit">Add Product</button></form>`)
});

app.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

app.use('/', (req, res, next) => {
   // console.log('In another Middleware!');
    res.send('<h1>Hello from Express!</h1>'); // Allows to send a response and allows to attach body which is of type any
    //res.send({'key1':'value'})
});

app.listen(3000);
