const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MeetingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Meeting = mongoose.model("meetings", MeetingSchema);