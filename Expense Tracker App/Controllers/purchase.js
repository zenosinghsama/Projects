const Razorpay = require('razorpay');
const Order = require("../Models/orders");
const userController = require('./userController');

exports.purchasePremium = async (req, res) => {
  try {
    const rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const amount = 10000;

    rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
      if (err) {
        console.log(err);
      }
      console.log(order);
      if(order) {
        try {
          await Order.create({ orderid: order.id, status: "PENDING", user: req.user._id });
          return res.status(201).json({ order, key_id: rzp.key_id });
        } catch (err) {
         console.log(err);
        }
      } else {
        console.log("NO ORDER PLACED")
      }

    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "Something went wrong", error: err });
  }
};



exports.updateStatus = async (req, res) => {
  try {
    const { payment_id, order_id } = req.body;
    const order = await Order.findOne({ where: { orderid: order_id } });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const promises = [
      order.updateOne({ paymentid: payment_id, status: "SUCCESSFUL" }),
      req.user.updateOne({ ispremiumuser: true }),
    ];

    Promise.all(promises)
    .then(() => {
      const userId = req.user._id;
        return res.status(201).json({ 
          success: true, 
          message: "Transaction Successful", 
          token: userController.generateAccessToken(userId, undefined, true) 
        });
    })
    .catch((err) => {
        throw new Error(err)
    })
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};