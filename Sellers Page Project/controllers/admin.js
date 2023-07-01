const path = require('path');

const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
};

exports.postAddProduct = async (req, res, next) => {

    try {
        const price = req.body.price;
        const name = req.body.name;
        const category = req.body.category;

        const product = await Product.create ({
            price: price,
            name: name,
            category: category
        })
        res.status(201).json({ newProduct: product });
    } 
    catch (err) {
        res.status(500).json ({ error: err})
    }
};

exports.getProduct = async(req, res, next) => {

    try {
        const products = await Product.findAll()
        res.status(200).json({ allProducts: products});
    } catch(err) {
        console.log("Failed to GET Product", json.stringify(err));
        res.status(500).json ({ error: err })
    }
};

exports.deleteProduct = async (req, res, next) => {
    const productId = req.params.productId;

    try {
        await Product.destroy( { where: { id: productId } } );
        res.status(200).json( {message: 'Product Deleted'});
    } catch(err) {
        console.log(err);
        res.status(500).json( { error: err });
    }
}