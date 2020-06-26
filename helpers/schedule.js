// Returns a list of time slots with start, end, and availability
function checkAvailability(schedule, meetingList) {
  console.log(schedule);
  console.log(meetingList);

  // Separate scheduled meetings that fall between the start of the first time slot, and end of last time slot

  var overlap = meetingList.filter(
    (meeting) =>
      (meeting.start >= schedule[0].start &&
        meeting.start < schedule[schedule.length - 1].end) ||
      (meeting.end > schedule[0].start &&
        meeting.end <= schedule[schedule.length - 1].end)
  );
  console.log("overlap:", overlap);
  schedule.forEach((sched) => {
    // If the meeting overlaps with a schedule slot, set the slot availability to false
    overlap.forEach((meeting) => {
      if (
        (sched.start >= meeting.start && sched.start < meeting.end) ||
        (sched.end > meeting.start && sched.end <= meeting.end)
      ) {
        console.log("hit");
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
    console.log("scheduleList[0].week");
    return scheduleList[0];
  }
  scheduleList.forEach((schedule) => {
    if (schedule.title === title) {
      return schedule;
    }
  });
  // No schedule found
  return [];
}

module.exports = { checkAvailability, findScheduleByTitle };
