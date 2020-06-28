const express = require("express");
const router = express.Router();
const { authUser } = require("../../middleware/authUser");
const { Date, addMinutes, daysInMonth } = require("../../helpers/date");
const { checkAvailability, getSlots } = require("../../helpers/schedule");
const { validateNewSchedule } = require("../../validation/schedule");
const { off } = require("../../models/User");

// Takes a list of schedules
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
      console.log(req.body);
      const newSchedule = {
        title: req.body.title,
        slots: req.body.slots,
      };
      user.schedules.push(newSchedule);
      user.save();
      res.send(newSchedule);
    }
  });
});

// + char should not be allowed in title (they are sent in requests as spaces)
// router.get("/schedule", (req, res) => {
//   // Get authorized user from decoded token (in middleware)
//   const userURL = req.query.userURL;
//   User.findOne({ link: userURL }).then((user) => {
//     if (!user) {
//       return res.status(404).json({ email: "User does not exist" });
//     } else {
//       // FIXME----------------------------------------------------------! NEED START AND END DATE BASED ON CLIENT TIMEZONE
//       var date = new Date(req.query.date);
//       date.setHours(0, 0, 0, 0);

//       var userSchedules = user.schedules;
//       var selected = [];
//       // If user has no schedules, process empty list
//       if (userSchedules.length === 0) {
//       }
//       // Default schedule requested (no title)
//       else if (!req.query.scheduleTitle) {
//         selected = userSchedules[0];
//       }
//       // If a schedule title is specified in the request, set the schedule -> selected
//       else {
//         title = req.query.scheduleTitle.replace("+", " ");
//         userSchedules.forEach((schedule) => {
//           if (schedule.title === title) {
//             selected = schedule;
//           }
//         });
//       }

//       var dateWeekday = date.getDay();
//       var schedule = selected.week.filter((day) => {
//         return day.weekday === dateWeekday;
//       });
//       // If user is not taking meetings, send empty list
//       if (schedule.length === 0) {
//         return res.send([]);
//       }

//       res.send(
//         checkAvailability(
//           getSlots(date, schedule[0].start, schedule[0].end, selected.interval),
//           user.meetings
//         )
//       );
//     }
//   });
// });

router.get("/schedule", (req, res) => {
  // Get authorized user from decoded token (in middleware)
  const userURL = req.query.userURL;
  User.findOne({ link: userURL }).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "User does not exist" });
    } else {
      // Collect all schedules the user has
      var userSchedules = user.schedules;
      var selecedSchedule = null;
      // If user has no schedules, process empty list
      if (userSchedules.length === 0) {
        return res.send([]);
      }
      // If a schedule title is specified in the request, set the schedule -> selected
      else {
        title = req.query.scheduleTitle.replace("+", " ");
        userSchedules.forEach((schedule) => {
          if (schedule.title === title) {
            selecedSchedule = schedule;
          }
        });
      }

      console.log(req.query.start, req.query.end);
      var slots = selecedSchedule.slots.filter((slot) => {
        if (
          new Date(slot.start) > new Date(req.query.start) &&
          new Date(slot.start) < new Date(req.query.end)
        ) {
          return slot;
        }
      });
      console.log(slots);
      return res.send(slots);
    }
  });
});

router.get("/schedule/month", (req, res) => {
  // Get authorized user from decoded token (in middleware)
  const userURL = req.query.userURL;
  User.findOne({ link: userURL }).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "User does not exist" });
    } else {
      console.log(req.query.date);
      var monthSchedule = [];

      // Set date to first of the month to return the entire month
      var date = new Date(req.query.date);
      date = new Date(date.getFullYear(), date.getMonth(), 1);

      date.setHours(0, 0, 0, 0);
      console.log("check");
      var month = date.getMonth();
      //Run until date gets first of next month
      while (date.getMonth() === month) {
        console.log("iteration");
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

        // var scheduleTZ = selected.timezone;
        // var clientTZ = req.query.timezone;

        // var zoneShift = parseInt(scheduleTZ) - parseInt(360);
        // console.log(zoneShift);

        var day = {};
        // If user is not taking meetings, send empty list
        if (schedule.length === 0) {
          day.date = date;
          day.schedule = [];
        } else {
          var daySchedule = checkAvailability(
            getSlots(
              date,
              schedule[0].start,
              schedule[0].end,
              selected.interval
            ),
            user.meetings
          );
          day.date = date;
          day.schedule = daySchedule;
        }

        monthSchedule.push(day);
        //console.log(monthSchedule);
        date = date.addDays(1);
      }
      console.log(monthSchedule);

      res.send(monthSchedule);
    }
  });
});

module.exports = router;
