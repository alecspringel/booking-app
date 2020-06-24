const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.get("/:userURL", (req, res) => {
  // Form validation
  console.log("book");
  console.log(req.params);
  User.findOne({ link: req.params.userURL }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404);
    }
    const userData = {
      first: user.first,
      last: user.last,
    };
    res.send(userData);
  });
});

module.exports = router;
