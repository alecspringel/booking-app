const express = require("express");
const router = express.Router();
const { authUser } = require("../../middleware/authUser");
const { addMinutes } = require("../../helpers/date");
const { checkAvailability, getSlots } = require("../../helpers/schedule");
const { validateNewSchedule } = require("../../validation/schedule");

router.post("/schedule/create", authUser, (req, res) => {
  const { errors, isValid } = validateNewSchedule(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // Get authorized user from decoded token (in middleware)
  const authUserID = req.user.id;
  User.findById(authUserID).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "User does not exist" });
    } else {
      const newWeek = req.body.newSchedule;
      const newSchedule = {
        title: req.body.title,
        week: newWeek,
        interval: req.body.interval,
        timezone: new Date().getTimezoneOffset(),
      };
      user.schedules.push(newSchedule);
      user.save();
      res.send(newSchedule);
    }
  });
});

// + char should not be allowed in title (they are sent in requests as spaces)
router.get("/schedule", authUser, (req, res) => {
  // Get authorized user from decoded token (in middleware)
  const userURL = req.query.userURL;
  User.findOne({ link: userURL }).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "User does not exist" });
    } else {
      // FIXME----------------------------------------------------------! NEED START AND END DATE BASED ON CLIENT TIMEZONE
      var date = new Date(req.query.date);
      date.setHours(0, 0, 0, 0);

      var userSchedules = user.schedules;
      var selected = [];
      // If user has no schedules, process empty list
      if (userSchedules.length === 0) {
      }
      // Default schedule requested (no title)
      else if (!req.query.scheduleTitle) {
        selected = userSchedules[0];
      }
      // If a schedule title is specified in the request, set the schedule -> selected
      else {
        title = req.query.scheduleTitle.replace("+", " ");
        userSchedules.forEach((schedule) => {
          if (schedule.title === title) {
            selected = schedule;
          }
        });
      }

      var dateWeekday = date.getDay();
      var schedule = selected.week.filter((day) => {
        return day.weekday === dateWeekday;
      });
      // If user is not taking meetings, send empty list
      if (schedule.length === 0) {
        return res.send([]);
      }

      res.send(
        checkAvailability(
          getSlots(date, schedule[0].start, schedule[0].end, selected.interval),
          user.meetings
        )
      );
    }
  });
});

module.exports = router;
