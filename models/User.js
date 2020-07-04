const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Meeting = require("./Meeting");

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
  schedules: [
    {
      title: String,
      description: String,
      duration: Number,
      offset: Number,
      weekdays: [
        [
          {
            weekday: Number,
            start: Number,
            end: Number,
          },
        ],
      ],
      slots: [
        {
          available: Boolean,
          start: Date,
          end: Date,
        },
      ],
    },
  ],
});

module.exports = User = mongoose.model("users", UserSchema);
