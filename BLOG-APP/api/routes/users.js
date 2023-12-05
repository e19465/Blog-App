const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
///////////////////////////////

// GET USER
router.get("/:id", async (req, res) => {
  if (req.body.userID === req.params.id) {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json("User not found!");
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } else {
    res.status(404).json("User not found");
  }
});

// UPDATE EVERYTHING
router.put("/:id", async (req, res) => {
  if (req.body.userID === req.params.id) {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      console.log("object");
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  } else {
    res.status(401).json("You can update your account only");
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userID === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        try {
          await Post.deleteMany({ username: user.username });
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json("User has been deleted!");
        } catch (err) {
          res.status(500).json(`Error: ${err.message}`);
        }
      } else {
        res.status(404).json("User not found");
      }
    } catch (err) {
      res.status(500).json(`Error: ${err.message}`);
    }
  } else {
    res.status(401).json("You can delete only your account.");
  }
});

module.exports = router;
