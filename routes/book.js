const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");



// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.get("/book/:userLink(\d+)", (req, res) => {
  // Form validation
  console.log("book")
  console.log(req.params)
  // // Check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  // const email = req.body.email;
  // const password = req.body.password;
  // // Find user by email
  // User.findOne({ email }).then((user) => {
  //   // Check if user exists
  //   if (!user) {
  //     return res.status(404).json({ emailnotfound: "Email not found" });
  //   }
  //   // Check password
  //   bcrypt.compare(password, user.password).then((isMatch) => {
  //     if (isMatch) {
  //       // User matched
  //       // Create JWT Payload
  //       const payload = {
  //         id: user.id,
  //         first: user.first,
  //         last: user.last,
  //       };
  //       // Sign token
  //       jwt.sign(
  //         payload,
  //         keys.secretOrKey,
  //         {
  //           expiresIn: 31556926, // 1 year in seconds
  //         },
  //         (err, token) => {
  //           res.json({
  //             success: true,
  //             token: "Bearer " + token,
  //           });
  //         }
  //       );
  //     } else {
  //       return res
  //         .status(400)
  //         .json({ passwordincorrect: "Password incorrect" });
  //     }
  //   });
  // });
});

module.exports = router;
