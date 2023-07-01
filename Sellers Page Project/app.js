const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const Product = require('./models/product');

const app = express();

app.set('views', path.join(__dirname, 'views'));

const adminRoutes = require('./routes/routes');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public/')));

app.use('/', adminRoutes);

app.get('/', (req, res, next) => {
        res.sendFile(path.join(__dirname, 'Views', 'index.html'));
});

app.get('/products', async (req, res) => {
    try{
        const products = await Product.findAll();
        res.send(products);
    } catch (err) {
        console.log(err);
    }
})

sequelize
.sync()
.then(result => {
    app.listen(3000);
}).catch(err => console.log(err));


