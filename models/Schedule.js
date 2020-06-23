const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ScheduleSchema = new Schema({
  weekday: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  startMinutes: {
    type: Number,
    required: true,
    min: 0,
    max: 1440
  },
  endMinutes: {
    type: Number,
    required: true,
    min: 0,
    max: 1440
  },
});

module.exports = Schedule = mongoose.model("schedules", ScheduleSchema);