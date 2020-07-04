const express = require("express");
const router = express.Router();
const { authUser } = require("../../middleware/authUser");
const { Date, addMinutes, daysInMonth } = require("../../helpers/date");
const {
  checkAvailability,
  getSlots,
  getWeekdaySlots,
} = require("../../helpers/schedule");
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
        description: req.body.description,
        duration: req.body.duration,
        weekdays: [[], [], [], [], [], [], []],
      };
      user.schedules.push(newSchedule);
      user.save();
      res.send(newSchedule);
    }
  });
});

router.post("/schedule/edit", authUser, (req, res) => {
  // const { errors, isValid } = validateEditSchedule(req.body);
  // // Check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  // Get authorized user from decoded token (in middleware)
  const authUserID = req.user.id;
  User.findById(authUserID).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "User does not exist" });
    } else {
      var userSchedules = user.schedules;
      var updateSchedules = userSchedules.filter(
        (schedule) => schedule.title !== req.body.title
      );
      var selected = userSchedules.find(
        (schedule) => schedule.title === req.body.title
      );
      selected.weekdays = req.body.weekdaySchedule;
      selected.offset = req.body.offset;
      updateSchedules.push(selected);
      user.schedules = updateSchedules;
      user.save();
      res.send(selected);
    }
  });
});

router.get("/schedules", authUser, (req, res) => {
  // Get authorized user from decoded token (in middleware)
  const authUserID = req.user.id;
  User.findById(authUserID).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "User does not exist" });
    } else {
      // Collect all schedules the user has
      var userSchedules = user.schedules;
      var scheduleList = [];

      userSchedules.forEach((schedule) => {
        scheduleList.push(schedule.title);
      });

      // If user has no schedules, process empty list
      res.send(scheduleList);
    }
  });
});

router.get("/schedule/view", authUser, (req, res) => {
  // Get authorized user from decoded token (in middleware)
  const authUserID = req.user.id;
  User.findById(authUserID).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "User does not exist" });
    } else {
      // Collect all schedules the user has
      var userSchedules = user.schedules;

      var selected = userSchedules.find(
        (schedule) => schedule.title === req.query.scheduleTitle
      );

      // If user has no schedules, process empty list
      res.send(selected);
    }
  });
});

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
      var weekdaySlots = getWeekdaySlots(
        selecedSchedule,
        req.query.start,
        req.query.end
      );
      console.log([...checkAvailability(weekdaySlots, user.meetings)]);
      return res.send([
        ...checkAvailability(slots, user.meetings),
        ...checkAvailability(weekdaySlots, user.meetings),
      ]);
    }
  });
});

module.exports = router;
