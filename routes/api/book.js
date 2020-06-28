const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const Meeting = require("../../models/Meeting");
const User = require("../../models/User");

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.get("/:userURL", (req, res) => {
  // Form validation
  User.findOne({ link: req.params.userURL }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404);
    }
    var scheduleTitles = [];
    user.schedules.forEach((schedule) => {
      const scheduleItem = {
        title: schedule.title,
      };
      scheduleTitles.push(scheduleItem);
    });
    const userData = {
      first: user.first,
      last: user.last,
      schedules: scheduleTitles,
    };
    res.send(userData);
  });
});

router.post("/create", (req, res) => {
  const newMeeting = new Meeting({
    start: req.body.start,
    end: req.body.end,
  });

  // Check if any other bookings overlap first
  User.findOne({
    link: req.body.link,
    meetings: {
      $elemMatch: {
        $or: [
          { start: { $gte: newMeeting.start, $lt: newMeeting.end } },
          { end: { $gt: newMeeting.start, $lte: newMeeting.end } },
        ],
      },
    },
  }).then((user) => {
    if (user) {
      return res
        .status(400)
        .json({ error: "Meeting conflicts with existing meeting." });
    } else {
      // Store meeting in ascending order within list
      User.update(
        { link: req.body.link },
        { $push: { meetings: { $each: [newMeeting], $sort: { start: 1 } } } },
        {},
        (err, newDoc) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            res.send(newDoc);
          }
        }
      );
    }
  });
});

module.exports = router;
