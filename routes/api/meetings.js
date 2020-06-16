const express = require("express");
const router = express.Router();
const { authUser } = require("../../middleware/authUser");
const User = require("../../models/User");
const Meeting = require("../../models/Meeting");

// @route POST api/events
// @desc Retrieve logged in user's events
// @access Private - Requires valid JWT token
router.get('/', authUser, (req, res) => {
  // Get authorized user from decoded token (in middleware)
  const authUserID = req.user.id;
  User.findById( authUserID ).then((user) => {
    res.send(user.meetings)
  })
})

// @route POST api/events/create
// @desc Create new event
// @access Private - Requires valid JWT token
router.post("/create", authUser, (req, res) => {
  User.findById(req.user.id).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "User does not exist" });
    } else {
      const newMeeting = req.body.newMeeting
      const meeting = new Event({
        title: newMeeting.title
      });

      user.meetings.push(meeting)
      user.save();
      res.send(newMeeting);
    }
  });
});

module.exports = router;