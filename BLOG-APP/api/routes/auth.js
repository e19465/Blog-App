const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
///////////////////////////////

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(401).json("Username already in use.");
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    // find is there user with provided username or email
    const isEmail = /\S+@\S+\.\S+/;
    let user;
    if (isEmail.test(req.body.email) || isEmail.test(req.body.username)) {
      user = await User.findOne({ email: req.body.email });
    } else {
      user = await User.findOne({ username: req.body.username });
    }
    if (!user) return res.status(400).json("Wrong Credentials!");

    // if user name found, then compare passwords(actual user in DB & login user passwords)
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) return res.status(401).json("Wrong Credentials!");

    // if everything is correct, then log the user
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
