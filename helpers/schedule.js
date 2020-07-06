const { addMinutes } = require("./date");
const { off } = require("../models/User");
// Returns a list of time slots with start, end, and availability
function checkAvailability(schedule, meetingList) {
  if (schedule.length === 0) {
    return [];
  }
  // Separate scheduled meetings that fall between the start of the first time slot, and end of last time slot
  var overlap = meetingList.filter(
    (meeting) =>
      (meeting.start >= schedule[0].start &&
        meeting.start < schedule[schedule.length - 1].end) ||
      (meeting.end > schedule[0].start &&
        meeting.end <= schedule[schedule.length - 1].end)
  );
  schedule.forEach((sched) => {
    // If the meeting overlaps with a schedule slot, set the slot availability to false
    overlap.forEach((meeting) => {
      if (
        (sched.start >= meeting.start && sched.start < meeting.end) ||
        (sched.end > meeting.start && sched.end <= meeting.end)
      ) {
        sched.available = false;
      }
    });
  });
  return schedule;
}

// Finds the schedule from a user's schedule list given a title
// NOTE: accepts "null" (string) titles (will return first list)
function findScheduleByTitle(scheduleList, title) {
  // User has no schedules
  if (scheduleList.length === 0) {
    return [];
  }
  // Default schedule requested (no title)
  if (!title) {
    return scheduleList[0].week;
  } else {
    title = title.replace("+", " ");
  }
  scheduleList.forEach((schedule) => {
    if (schedule.title === title) {
      var selected = [];
      return selected;
    }
  });
  // No schedule found
  return [];
}

// Returns list of possible time slots
function getSlots(date, begin, finish, interval) {
  // Process meeting slots
  const start = addMinutes(date, begin);
  const end = addMinutes(date, finish);

  var schedList = [];
  var schedStart = start;
  var schedEnd = addMinutes(start, interval);

  while (schedEnd <= end) {
    const slot = {
      available: true,
      start: schedStart,
      end: schedEnd,
    };
    schedList.push(slot);
    schedStart = addMinutes(schedStart, interval);
    schedEnd = addMinutes(schedEnd, interval);
  }
  return schedList;
}

// Returns list of possible time slots
function getWeekdaySlots(schedule, start, end) {
  var slots = [];
  var start = new Date(start);
  start.setUTCHours(0, 0, 0, 0);
  var weekday = start.getUTCDay();
  var intervals = schedule.weekdays[weekday];

  while (start <= new Date(end)) {
    intervals.forEach((interval) => {
      var startCopy = addMinutes(start, interval.start);
      startCopy = addMinutes(startCopy, schedule.offset);
      var endCopy = addMinutes(start, interval.end);
      endCopy = addMinutes(endCopy, schedule.offset);
      var updated = checkForCustomSlot(
        schedule.customSchedule,
        schedule.offset,
        startCopy,
        endCopy,
        interval
      );
      console.log(updated.start);
      startCopy = updated.start;
      endCopy = updated.end;

      // Begin at the start of each interval, and add *duration* minutes until the end of the interval
      var current = interval.start;
      while (startCopy <= addMinutes(endCopy, schedule.duration * -1)) {
        // If a custom slot overlaps, skip adding this slot
        const slot = {
          available: true,
          start: startCopy,
          end: addMinutes(startCopy, schedule.duration),
        };
        slots.push(slot);
        current += schedule.duration;
        startCopy = addMinutes(startCopy, schedule.duration);
      }
    });
    start = addMinutes(start, 1440);
    weekday = start.getUTCDay();
    intervals = schedule.weekdays[weekday];
  }
  return slots;
}

function checkForCustomSlot(custom, offset, start, end, interval) {
  var updated = {
    start: start,
    end: end,
  };

  for (var i = 0; i < custom.length; i++) {
    var customStart = addMinutes(new Date(custom[i].start), offset);
    var customEnd = addMinutes(new Date(custom[i].end), offset);

    if (updated.start >= customStart && updated.start < customEnd) {
      // Complete overlap
      if (customEnd >= updated.end) {
        console.log("Complete overlap setting start", start, "to:", end);
        updated = {
          start: end,
          end: end,
        };
        return updated;
      } // Otherwise, partial overlap (move start of interval to end of custom's end)
      else {
        console.log(
          "Start overlap: setting start",
          updated.start,
          "to:",
          customEnd
        );
        console.log(updated.start, updated.end);

        updated.start = customEnd;
      }
    }
    // If the overlap isn't complete (return null), check if the end contains overlap
    if (updated.end > customStart && updated.end <= customEnd) {
      console.log(
        "End overlap: setting start",
        updated.end,
        "to:",
        customStart
      );
      updated.end = customStart;
    }
  }
  return updated;
}

function getCustomSlots(schedule) {
  var slots = [];
  var customs = schedule.customSchedule;
  customs.forEach((custom) => {
    var start = custom.start;
    custom.intervals.forEach((interval) => {
      var startCopy = addMinutes(start, interval.start);
      startCopy = addMinutes(startCopy, schedule.offset);
      var endCopy = addMinutes(start, interval.end);
      endCopy = addMinutes(endCopy, schedule.offset);

      // Begin at the start of each interval, and add *duration* minutes until the end of the interval
      var current = interval.start;
      while (startCopy <= addMinutes(endCopy, schedule.duration * -1)) {
        // If a custom slot overlaps, skip adding this slot
        const slot = {
          available: true,
          start: startCopy,
          end: addMinutes(startCopy, schedule.duration),
        };
        slots.push(slot);
        current += schedule.duration;
        startCopy = addMinutes(startCopy, schedule.duration);
      }
    });
  });
  return slots;
}

module.exports = {
  checkAvailability,
  findScheduleByTitle,
  getSlots,
  getWeekdaySlots,
  getCustomSlots,
};
