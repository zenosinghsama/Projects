const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');

exports.authenticateToken = async (req, res, next) => {

  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

  req.user = user;
  next();
    } 
  catch (err) {
    console.log("catch", err)
    res.status(401).json({ success: false, message:'authentication failed'})
  }
}
