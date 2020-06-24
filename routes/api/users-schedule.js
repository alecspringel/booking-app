const express = require("express");
const router = express.Router();
const { authUser } = require("../../middleware/authUser");
const { addMinutes } = require("../../helpers/date")
var moment = require('moment');

router.post("/schedule/create", authUser, (req, res) => {
  // Get authorized user from decoded token (in middleware)
  const authUserID = req.user.id;
  User.findById(authUserID).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "User does not exist" });
    } else {
      const newSchedule = req.body.newSchedule;
      user.schedules.interval = 60;
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
      console.log(user)
      var date = moment(new Date(req.query.date).setHours(0,0,0,0));

      console.log("date:", date)
      // var dateWeekday = date.getDay()
      // var schedule = user.schedules.week.filter(day => {
      //   return day.weekday === dateWeekday
      // });
      // // If user is not taking meetings that day, send null
      // if(schedule.length === 0) {
      //   res.send(null)
      //   return
      // }
      // console.log(schedule)

      // // Process meeting slots
      // const start = addMinutes(date, schedule[0].start)
      // const end = addMinutes(date, schedule[0].end)
      // console.log(start, end)


    }
  });
});

module.exports = router;
