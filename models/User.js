const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Meeting = require("./Meeting");
const Schedule = require("./Schedule");

// Create Schema
const UserSchema = new Schema({
  first: {
    type: String,
    required: true,
  },
  last: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  meetings: {
    type: [Meeting.Schema],
    default: [],
  },
  schedules: {
    type: [Schedule.Schema],
    default: [defaultSchedule],
  },
});

//Default schedule
const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
var defaultSchedule = {
  Monday: { available: false },
  Tuesday: { available: false },
  Wednesday: { available: false },
  Thursday: { available: false },
  Friday: { available: false },
  Saturday: { available: false },
  Sunday: { available: false },
};
const start = {
  hour: 9,
  minute: 0,
  amPm: "AM",
};
const end = {
  hour: 9,
  minute: 0,
  amPm: "AM",
};
weekdays.map((day) => {
  defaultSchedule[day].start = start;
  defaultSchedule[day].end = end;
});

module.exports = User = mongoose.model("users", UserSchema);
