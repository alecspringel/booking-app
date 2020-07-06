const { addMinutes } = require("./date");
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
      var endCopy = addMinutes(startCopy, interval.end);
      checkForCustomSlot(schedule.customSchedule, startCopy, endCopy, interval);
      // Begin at the start of each interval, and add *duration* minutes until the end of the interval
      var current = interval.start;
      while (current <= interval.end) {
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

function checkForCustomSlot(customSchedules, start, end, interval) {
  console.log(start, "=====>", end);
  console.log(customSchedules);
}

module.exports = {
  checkAvailability,
  findScheduleByTitle,
  getSlots,
  getWeekdaySlots,
};
