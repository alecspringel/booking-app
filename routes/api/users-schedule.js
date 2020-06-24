const express = require("express");
const router = express.Router();
const { authUser } = require("../../middleware/authUser");

router.post("/schedule/create", authUser, (req, res) => {
  // Get authorized user from decoded token (in middleware)
  const authUserID = req.user.id;
  User.findById(authUserID).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "User does not exist" });
    } else {
      var updatedSchedule = [];
      const newSchedule = req.body.newSchedule;
      // newSchedule.forEach((day) => {
      //   const daySchedule = new Schedule({
      //     weekday: day.weekday,
      //     start: day.start,
      //     end: day.end,
      //   });
      //   updatedSchedule.push(daySchedule);
      // });
      user.schedules.interval = 60;
      user.schedules.week = newSchedule;
      user.save();
      res.send(newSchedule);
    }
  });
});

module.exports = router;
