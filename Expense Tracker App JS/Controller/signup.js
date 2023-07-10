const path = require("path");

const User = require("../Models/usersignup");

const bcrypt = require("bcrypt");

exports.getAddUser = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../views", "Signup.html"));
};

exports.postAddUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Generate a Salt -> to use for hashing
    const salt = await bcrypt.genSalt(10);

    // hash the password
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      username: username,
      email: email,
      password: hashedPassword
    });
    res.status(200).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
