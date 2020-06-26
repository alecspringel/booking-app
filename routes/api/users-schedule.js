const express = require("express");
const router = express.Router();
const { authUser } = require("../../middleware/authUser");
const { addMinutes } = require("../../helpers/date");
const {
  checkAvailability,
  findScheduleByTitle,
} = require("../../helpers/schedule");
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

router.get("/schedule", authUser, (req, res) => {
  // Get authorized user from decoded token (in middleware)
  const userURL = req.query.userURL;
  User.findOne({ link: userURL }).then(async (user) => {
    if (!user) {
      return res.status(404).json({ email: "User does not exist" });
    } else {
      // FIXME----------------------------------------------------------! NEED START AND END DATE BASED ON CLIENT TIMEZONE
      var date = new Date(req.query.date);
      date.setHours(0, 0, 0, 0);

      //console.log(user.schedules);
      // returns null if no schedules present
      var userSchedules = user.schedules;
      var selectedSchedule = await findScheduleByTitle(
        userSchedules,
        req.query.scheduleTitle
      );

      // // User hasn't created any schedules
      // if (selectedSchedule === null) {
      //   return res.send([]);
      // }
      // Get the schedule (from the user) for that weekday
      var dateWeekday = date.getDay();
      var schedule = selectedSchedule.week.filter((day) => {
        return day.weekday === dateWeekday;
      });
      // If user is not taking meetings, send empty list
      if (schedule.length === 0) {
        return res.send([]);
      }

      // Process meeting slots
      const start = addMinutes(date, schedule[0].start);
      const end = addMinutes(date, schedule[0].end);
      console.log(start);

      var schedList = [];
      var schedStart = start;
      var schedEnd = addMinutes(start, selectedSchedule.interval);

      while (schedEnd <= end) {
        const slot = {
          available: true,
          start: schedStart,
          end: schedEnd,
        };
        schedList.push(slot);
        schedStart = addMinutes(schedStart, selectedSchedule.interval);
        schedEnd = addMinutes(schedEnd, selectedSchedule.interval);
      }
      console.log(schedList);

      res.send(checkAvailability(schedList, user.meetings));
    }
  });
});

module.exports = router;
