const express = require("express");
const router = express.Router();
const { authUser } = require("../../middleware/authUser");
const { addMinutes } = require("../../helpers/date");

router.post("/schedule/create", authUser, (req, res) => {
  // Get authorized user from decoded token (in middleware)
  const authUserID = req.user.id;
  User.findById(authUserID).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "User does not exist" });
    } else {
      const newSchedule = req.body.newSchedule;
      user.schedules.interval = 60;
      var offset = new Date().getTimezoneOffset();
      user.schedules.timezone = offset;
      user.schedules.week = newSchedule;
      user.save();
      res.send(newSchedule);
    }
  });
});

router.get("/schedule", authUser, (req, res) => {
  // Get authorized user from decoded token (in middleware)
  const userURL = req.query.userURL;
  User.findOne({ link: userURL }).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "User does not exist" });
    } else {
      var date = new Date(req.query.date);
      date.setHours(0, 0, 0, 0);

      // Get the schedule (from the user) for that weekday
      var dateWeekday = date.getDay();
      var schedule = user.schedules.week.filter((day) => {
        return day.weekday === dateWeekday;
      });

      // If user is not taking meetings that day, send empty list
      if (schedule.length === 0) {
        res.send([]);
        return;
      }

      // Process meeting slots
      const start = addMinutes(date, schedule[0].start);
      const end = addMinutes(date, schedule[0].end);

      var schedList = [];
      var schedStart = start;
      var schedEnd = addMinutes(start, user.schedules.interval);

      while (schedEnd < end) {
        const slot = {
          available: true,
          start: schedStart,
          end: schedEnd,
        };
        schedList.push(slot);
        schedStart = addMinutes(schedStart, user.schedules.interval);
        schedEnd = addMinutes(schedEnd, user.schedules.interval);
      }
      res.send(schedList);
    }
  });
});

module.exports = router;
