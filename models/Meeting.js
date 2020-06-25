const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MeetingSchema = new Schema({
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
});

module.exports = Meeting = mongoose.model("meetings", MeetingSchema);
